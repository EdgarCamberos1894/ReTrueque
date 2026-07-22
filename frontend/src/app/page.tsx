'use client';

import TopbarHome from '@/components/containers/topbar-home';
import CarouselHome from '@/components/containers/carousel-home';
import FormHome from '@/components/filters/form-home';
import SectionServicesHome from '@/components/containers/section-services-home';

export default function Home() {
  return (
    <main className="w-full">
      <section>
        <CarouselHome />
        <TopbarHome />
      </section>
      <section className="relative flex min-h-28 items-center justify-center bg-primary">
        <div className="absolute z-10 w-full -translate-y-20">
          <FormHome />
        </div>
      </section>
      <SectionServicesHome />
    </main>
  );
}
