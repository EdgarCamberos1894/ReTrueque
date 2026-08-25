'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import useProvincias from '@/hooks/useProvincias';
import useCategorys from '@/hooks/useCategorys';
import useDepartaments from '@/hooks/useDepartaments';

const formSchema = z.object({
  provincia: z.string().min(1, 'La provincia es obligatoria'),
  departamento: z.string().min(1, 'Seleccione un departamento'),
  category: z.string().min(1, 'Seleccione una categoría'),
});

function FormHome() {
  const router = useRouter();
  const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(null);

  const { data: provincias, isLoading: isLoadingProvincias } = useProvincias();
  const { data: categorys, isLoading: isLoadingCategorys } = useCategorys();
  const { data: departamentos, isLoading: isLoadingDepartamentos } = useDepartaments(
    selectedProvinciaId || 0,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provincia: '',
      departamento: '',
      category: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const searchParams = new URLSearchParams({
      provincia: data.provincia,
      departamento: data.departamento,
      category: data.category,
    });

    router.push(`/public/searchCategorys?${searchParams.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl bg-secondary p-4 shadow-xl sm:p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:items-center"
        >
          <FormField
            name="provincia"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    value={field.value || ''}
                    disabled={isLoadingProvincias}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('departamento', '');
                      setSelectedProvinciaId(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-12 w-full bg-white shadow-md">
                      <SelectValue placeholder={isLoadingProvincias ? 'Cargando provincias...' : 'Provincia'} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(provincias) && provincias.length > 0 ? (
                        provincias.map((provincia) => (
                          <SelectItem key={provincia.id} value={provincia.id.toString()}>
                            {provincia.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-provincias" disabled>
                          No hay provincias disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="departamento"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    disabled={!selectedProvinciaId || isLoadingDepartamentos}
                  >
                    <SelectTrigger className="h-12 w-full bg-white shadow-md">
                      <SelectValue
                        placeholder={
                          isLoadingDepartamentos ? 'Cargando departamentos...' : 'Departamento'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(departamentos) && departamentos.length > 0 ? (
                        departamentos.map((departamento) => (
                          <SelectItem key={departamento.id} value={departamento.id.toString()}>
                            {departamento.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-departamentos" disabled>
                          Seleccione una provincia
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    disabled={isLoadingCategorys}
                  >
                    <SelectTrigger className="h-12 w-full bg-white shadow-md">
                      <SelectValue placeholder={isLoadingCategorys ? 'Cargando categorías...' : 'Categoría'} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(categorys) && categorys.length > 0 ? (
                        categorys.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-categorias" disabled>
                          No hay categorías disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full bg-primary px-8 text-base font-bold text-black shadow-md hover:bg-primary-variant-1 sm:col-span-2 lg:col-span-1 lg:w-auto"
          >
            Buscar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormHome;
