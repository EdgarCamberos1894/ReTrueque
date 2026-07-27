'use client';

import TopbarHome from '@/components/containers/topbar-home';
import CarouselHome from '@/components/containers/carousel-home';
import FormHome from '@/components/filters/form-home';
import SectionServicesHome from '@/components/containers/section-services-home';

export default function Home() {
  return (
    <main className="w-full overflow-x-clip">
      <section className="relative isolate bg-primary">
        <CarouselHome />
        <TopbarHome />
      </section>

      <section
        aria-label="Buscar servicios"
        className="relative z-30 bg-primary px-4 pb-9 sm:px-6 lg:px-8"
      >
        <div className="mx-auto -mt-12 w-full max-w-5xl sm:-mt-16">
          <FormHome />
        </div>
      </section>

      <SectionServicesHome />
    </main>
  );
}
