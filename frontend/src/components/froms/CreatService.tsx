'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Camera, Save, X } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import useCategorys from '@/hooks/useCategorys';
import type { DataServiceForIdResponse } from '@/lib/response';
import { saveService } from '@/services/CreateService';

const serviceSchema = z.object({
  title: z.string().trim().min(5, 'El título debe tener al menos 5 caracteres.'),
  description: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres.'),
  rules: z.string().trim().min(10, 'Los intereses deben tener al menos 10 caracteres.'),
  categoryId: z.number().min(1, 'Selecciona una categoría.'),
  days: z.array(z.number()).min(1, 'Selecciona al menos un día.'),
  shiftTime: z.array(z.number()).min(1, 'Selecciona al menos un horario.'),
});

const daysOfWeek = [
  { name: 'L', label: 'Lunes', number: 1 },
  { name: 'M', label: 'Martes', number: 2 },
  { name: 'M', label: 'Miércoles', number: 3 },
  { name: 'J', label: 'Jueves', number: 4 },
  { name: 'V', label: 'Viernes', number: 5 },
  { name: 'S', label: 'Sábado', number: 6 },
  { name: 'D', label: 'Domingo', number: 7 },
];

const timeOfDay = [
  { name: 'Mañana', number: 1 },
  { name: 'Tarde', number: 2 },
  { name: 'Noche', number: 3 },
];

interface ServiceFormProps {
  service?: DataServiceForIdResponse;
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const isEditing = Boolean(service);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading: isLoadingCategories } = useCategorys();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(service?.imgUrl ?? '');
  const [days, setDays] = useState<number[]>(service?.days ?? []);
  const [shiftTime, setShiftTime] = useState<number[]>(service?.shiftTime ?? []);
  const [selectedCategoryId, setSelectedCategoryId] = useState(service?.category.id ?? 0);
  const [title, setTitle] = useState(service?.title ?? '');
  const [description, setDescription] = useState(service?.description ?? '');
  const [rules, setRules] = useState(service?.rules ?? '');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedFile) return;
    const previewUrl = URL.createObjectURL(selectedFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedFile]);

  const toggleValue = (
    value: number,
    setter: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');

    const result = serviceSchema.safeParse({
      title,
      description,
      rules,
      categoryId: selectedCategoryId,
      days,
      shiftTime,
    });
    const errors = result.success ? [] : result.error.errors.map((error) => error.message);

    if (!isEditing && !selectedFile) {
      errors.push('Selecciona una imagen para el servicio.');
    }
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      errors.push('La imagen debe ser menor a 2 MB.');
    }
    if (selectedFile && !['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
      errors.push('La imagen debe ser JPEG, PNG o WebP.');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setIsSubmitting(true);
    try {
      await saveService(
        {
          title: title.trim(),
          description: description.trim(),
          rules: rules.trim(),
          image: selectedFile,
          categoryId: selectedCategoryId,
          days,
          shiftTime,
        },
        service?.id,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['services'] }),
        queryClient.invalidateQueries({ queryKey: ['servicesById'] }),
        queryClient.invalidateQueries({ queryKey: ['serviceForId', service?.id] }),
      ]);
      router.push('/dashboard/perfil');
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo guardar el servicio.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{isEditing ? 'Editar servicio' : 'Publicar servicio'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-lg border border-[#BAD6EF] bg-white p-6 shadow-sm">
          <Label htmlFor="service-image" className="mb-3 block text-base font-semibold">
            Imagen
          </Label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100 sm:w-60">
              {imagePreview ? (
                <Image src={imagePreview} alt="Vista previa del servicio" fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <Camera className="h-10 w-10" aria-hidden="true" />
                </div>
              )}
            </div>
            <label
              htmlFor="service-image"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-black bg-white px-4 text-sm font-semibold hover:bg-gray-100 focus-within:ring-2 focus-within:ring-[#618FBA]"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              {imagePreview ? 'Cambiar imagen' : 'Seleccionar imagen'}
              <input
                id="service-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="sr-only"
              />
            </label>
          </div>
        </section>

        <section className="space-y-5 rounded-lg border border-[#618FBA] bg-[#BAD6EF] p-6">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">Título</Label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 h-11 w-full rounded-md border border-gray-500 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-[#618FBA]"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-semibold">Descripción</Label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-1 min-h-28 w-full rounded-md border border-gray-500 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#618FBA]"
            />
          </div>

          <div>
            <Label htmlFor="rules" className="text-base font-semibold">Intereses de intercambio</Label>
            <textarea
              id="rules"
              value={rules}
              onChange={(event) => setRules(event.target.value)}
              className="mt-1 min-h-28 w-full rounded-md border border-gray-500 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#618FBA]"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-base font-semibold">Categoría</Label>
            <select
              id="category"
              value={selectedCategoryId || ''}
              onChange={(event) => setSelectedCategoryId(Number(event.target.value))}
              className="mt-1 h-11 w-full rounded-md border border-gray-500 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-[#618FBA]"
              disabled={isLoadingCategories}
            >
              <option value="">Selecciona una categoría</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="text-base font-semibold">Días disponibles</legend>
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-7">
              {daysOfWeek.map((day) => (
                <label key={day.number} className="flex cursor-pointer flex-col items-center gap-2" title={day.label}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full border border-black font-bold ${days.includes(day.number) ? 'bg-[#F7C036]' : 'bg-white'}`}>
                    {day.name}
                  </span>
                  <Checkbox
                    checked={days.includes(day.number)}
                    onCheckedChange={() => toggleValue(day.number, setDays)}
                    aria-label={day.label}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-base font-semibold">Horarios</legend>
            <div className="mt-3 flex flex-wrap gap-4">
              {timeOfDay.map((time) => (
                <label key={time.number} className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-3 py-2">
                  <Checkbox
                    checked={shiftTime.includes(time.number)}
                    onCheckedChange={() => toggleValue(time.number, setShiftTime)}
                  />
                  <span>{time.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {(validationErrors.length > 0 || submitError) && (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            {validationErrors.map((error) => <p key={error}>{error}</p>)}
            {submitError && <p>{submitError}</p>}
          </div>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#F7C036] text-black hover:bg-[#F6B404]" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" aria-hidden="true" />
            {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Publicar'}
          </Button>
        </div>
      </form>
    </main>
  );
}
