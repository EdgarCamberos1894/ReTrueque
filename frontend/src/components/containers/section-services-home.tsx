'use client';

import CardServicio from '@/components/cards/Cardcategory';
import { useServicesHomeSize12 } from '@/hooks/useServices';

export default function SectionServicesHome() {
  const { data: services, isLoading, isError } = useServicesHomeSize12();
  const results = services?.content.map((service) => ({
    id: service.id,
    imag: service.imgUrl,
    titulo: service.title,
    descripcion: service.description,
    ubicacion: [service.departamento?.name, service.provincia?.name].filter(Boolean).join(', '),
  })) ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
      <h2 className="text-3xl font-bold">Servicios disponibles</h2>
      {isLoading && <p className="py-10 text-gray-600">Cargando servicios...</p>}
      {isError && <p className="py-10 text-red-700">No se pudieron cargar los servicios.</p>}
      {!isLoading && !isError && results.length === 0 && (
        <p className="py-10 text-gray-600">Todavía no hay servicios publicados.</p>
      )}
      {results.length > 0 && <CardServicio dataResultados={results} />}
    </section>
  );
}
