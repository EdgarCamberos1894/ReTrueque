'use client';

import Image from 'next/image';
import { Edit, Eye, MapPin, Plus, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/buttons/DeleteService';

interface HeaderProfileProps {
  user: {
    name: string;
    profileImagUrl?: string;
    rating: number;
    ubicacion: string;
  };
  products: {
    id: number;
    title: string;
    description: string;
    imag: string;
  }[];
}

export default function HeaderProfile({ user, products }: HeaderProfileProps) {
  const router = useRouter();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
      <section className="rounded-lg border border-[#BAD6EF] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarImage src={user.profileImagUrl || 'https://placehold.co/96x96/png'} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="break-words text-2xl font-bold">{user.name}</h1>
              <div className="mt-2 flex items-center gap-2" aria-label={`Calificación ${user.rating.toFixed(1)} de 5`}>
                <Star className="h-5 w-5 fill-[#F7C036] text-[#F6B404]" aria-hidden="true" />
                <span className="font-semibold">{user.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push('/dashboard/perfil/editar')}
            title="Editar perfil"
            aria-label="Editar perfil"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-6 flex items-center gap-2 text-gray-700">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {user.ubicacion}
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Mis servicios</h2>
          <Button
            size="sm"
            className="bg-[#F7C036] text-black hover:bg-[#F6B404]"
            onClick={() => router.push('/public/servicio/nuevo')}
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Publicar
          </Button>
        </div>

        <div className="max-h-[430px] space-y-3 overflow-y-auto pr-1">
          {products.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-400 bg-white p-6 text-center text-gray-600">
              No tienes servicios publicados.
            </div>
          )}
          {products.map((product) => (
            <article key={product.id} className="flex gap-4 rounded-lg border border-[#BAD6EF] bg-white p-3 shadow-sm">
              <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.imag || 'https://placehold.co/160x120/png'}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <h3 className="line-clamp-1 font-bold">{product.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => router.push(`/public/servicio/${product.id}`)}
                    title="Ver servicio"
                    aria-label={`Ver ${product.title}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/servicio/${product.id}/editar`)}
                    title="Editar servicio"
                    aria-label={`Editar ${product.title}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DeleteButton serviceId={product.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
