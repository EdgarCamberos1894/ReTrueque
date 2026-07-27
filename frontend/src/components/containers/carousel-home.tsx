'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertCircleIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

const banners = [
  'banner1psd 4.jpg',
  'banner2psd 2.jpg',
  'banner3psd 2.jpg',
];

function CarouselHome() {
  const router = useRouter();
  const { token } = useAuthStore();
  const autoplay = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section
      aria-label="Servicios destacados de ReTrueque"
      className="relative w-full overflow-hidden bg-primary"
    >
      <Carousel
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
          duration: 60,
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent className="ml-0">
          {banners.map((item, index) => (
            <CarouselItem key={item} className="basis-full pl-0">
              <div className="relative h-[clamp(440px,72svh,720px)] w-full sm:h-[clamp(500px,68svh,720px)]">
                <Image
                  src={`/img/${item}`}
                  alt={`Servicio destacado ${index + 1} de ReTrueque`}
                  priority={index === 0}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 px-4 sm:bottom-24 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl justify-center sm:justify-start">
            {!token ? (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button
                    size="lg"
                    className="pointer-events-auto min-h-12 w-full max-w-xs bg-primary px-6 font-bold uppercase text-black shadow-lg hover:bg-primary-variant-1 sm:w-auto"
                  >
                    Publicar anuncio
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl sm:p-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <AlertCircleIcon className="h-16 w-16 text-red-700 sm:h-20 sm:w-20" aria-hidden="true" />
                      <Dialog.Title className="text-md font-bold">
                        Inicia sesión para publicar
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-neutral-700">
                        Para publicar un servicio necesitas registrarte o iniciar sesión. Únete a la comunidad y comienza a intercambiar tus habilidades.
                      </Dialog.Description>
                      <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild variant="outline" className="w-full font-bold sm:w-auto">
                          <Link href="/auth/login">Iniciar sesión</Link>
                        </Button>
                        <Button asChild variant="secondary" className="w-full font-bold sm:w-auto">
                          <Link href="/auth/registro">Registrarse</Link>
                        </Button>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ) : (
              <Button
                type="button"
                size="lg"
                onClick={() => router.push('/public/servicio/nuevo')}
                className="pointer-events-auto min-h-12 w-full max-w-xs bg-primary px-6 font-bold uppercase text-black shadow-lg hover:bg-primary-variant-1 sm:w-auto"
              >
                Publicar anuncio
              </Button>
            )}
          </div>
        </div>
      </Carousel>
    </section>
  );
}

export default CarouselHome;
