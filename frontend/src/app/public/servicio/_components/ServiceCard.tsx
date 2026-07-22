'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Edit, LogIn, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactUser } from '@/components/dialog/ContactarUser';
import { useAuthStore } from '@/store/auth';

interface ServiceCardProps {
  id: number;
  idUser: number;
  title: string;
  description: string;
  rules: string;
  image: string;
  userName: string;
  category: string;
  province: string;
  department: string;
  days: number[];
  shiftTime: number[];
}

const dayLabels = [
  { id: 1, short: 'L', name: 'Lunes' },
  { id: 2, short: 'M', name: 'Martes' },
  { id: 3, short: 'M', name: 'Miércoles' },
  { id: 4, short: 'J', name: 'Jueves' },
  { id: 5, short: 'V', name: 'Viernes' },
  { id: 6, short: 'S', name: 'Sábado' },
  { id: 7, short: 'D', name: 'Domingo' },
];

const shiftLabels: Record<number, string> = {
  1: 'Mañana',
  2: 'Tarde',
  3: 'Noche',
};

export default function ServiceCard({
  id,
  idUser,
  title,
  description,
  rules,
  image,
  userName,
  category,
  province,
  department,
  days,
  shiftTime,
}: ServiceCardProps) {
  const token = useAuthStore((state) => state.token);
  const authUserId = useAuthStore((state) => state.id);
  const isOwner = Boolean(token) && authUserId === idUser;

  return (
    <article className="overflow-hidden rounded-lg border-2 border-[#BAD6EF] bg-white p-5 shadow-sm lg:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image || 'https://placehold.co/571x416/png'}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#486f94]">{category}</p>
            <h1 className="break-words text-3xl font-bold">{title}</h1>
            <p className="mt-4 text-lg leading-7 text-gray-700">{description}</p>
            <div className="mt-5 rounded-lg border border-[#F7C036] bg-yellow-50 p-4">
              <h2 className="text-sm font-bold uppercase">Busca a cambio</h2>
              <p className="mt-1 text-gray-700">{rules}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {isOwner ? (
              <Button asChild className="bg-[#F7C036] text-black hover:bg-[#F6B404]">
                <Link href={`/dashboard/servicio/${id}/editar`}>
                  <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                  Editar servicio
                </Link>
              </Button>
            ) : token ? (
              <ContactUser Databutton={{ idservice: id, userId: idUser }} />
            ) : (
              <Button asChild className="bg-[#F7C036] text-black hover:bg-[#F6B404]">
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                  Iniciar sesión
                </Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href={isOwner ? '/dashboard/perfil' : `/public/perfil/${idUser}`}>
                <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
                {isOwner ? 'Mi perfil' : `Perfil de ${userName}`}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-gray-500">Categoría</dt>
          <dd className="font-semibold">{category}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Provincia</dt>
          <dd className="font-semibold">{province}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Departamento</dt>
          <dd className="font-semibold">{department}</dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-6 border-t pt-6 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-600">Días disponibles</h2>
          <ul className="flex flex-wrap gap-2">
            {dayLabels.map((day) => {
              const selected = days.includes(day.id);
              return (
                <li key={day.id}>
                  <span
                    title={day.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border font-semibold ${selected ? 'border-[#F6B404] bg-[#F7C036]' : 'border-gray-300 bg-gray-100 text-gray-400'}`}
                  >
                    {day.short}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-600">Horarios</h2>
          <ul className="flex flex-wrap gap-2">
            {shiftTime.map((shift) => (
              <li key={shift} className="rounded-full border border-[#618FBA] bg-[#BAD6EF] px-4 py-2 font-semibold">
                {shiftLabels[shift] ?? `Turno ${shift}`}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
