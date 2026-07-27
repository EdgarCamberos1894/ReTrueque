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
import { cn } from '@/lib/utils';

const banners = [
  {
    src: '/img/banner1psd 4.jpg',
    alt: 'Servicio destacado de ReTrueque',
  },
  {
    src: '/img/banner2psd 2.jpg',
    alt: 'Intercambio de habilidades dentro de la comunidad ReTrueque',
  },
  {
    src: '/img/banner3psd 2.jpg',
    alt: 'Personas compartiendo servicios mediante ReTrueque',
  },
];

type PublishActionProps = {
  isAuthenticated: boolean;
  onPublish: () => void;
  className?: string;
};

function PublishAction({
  isAuthenticated,
  onPublish,
  className,
}: PublishActionProps) {
  const buttonClassName = cn(
    'min-h-12 w-full max-w-xs border-2 border-white bg-secondary px-6 font-bold uppercase text-black shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-secondary-variant-1 focus-visible:ring-white sm:w-auto',
    className,
  );

  if (isAuthenticated) {
    return (
      <Button
        type="button"
        size="lg"
        onClick={onPublish}
        className={buttonClassName}
      >
        Publicar anuncio
      </Button>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="lg" className={buttonClassName}>
          Publicar anuncio
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircleIcon
              className="h-16 w-16 text-red-700 sm:h-20 sm:w-20"
              aria-hidden="true"
            />
            <Dialog.Title className="text-md font-bold">
              Inicia sesión para publicar
            </Dialog.Title>
            <Dialog.Description className="text-xs text-neutral-700">
              Para publicar un servicio necesitas registrarte o iniciar sesión.
              Únete a la comunidad y comienza a intercambiar tus habilidades.
            </Dialog.Description>
            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                variant="outline"
                className="w-full font-bold sm:w-auto"
              >
                <Link href="/auth/login">Iniciar sesión</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full font-bold sm:w-auto"
              >
                <Link href="/auth/registro">Registrarse</Link>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

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

  const handlePublish = () => router.push('/public/servicio/nuevo');

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
          {banners.map((banner, index) => (
            <CarouselItem key={banner.src} className="basis-full pl-0">
              <div className="relative mx-auto h-[clamp(180px,43.125vw,621px)] w-full max-w-[1440px] bg-primary">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  priority={index === 0}
                  fill
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 hidden px-6 sm:block lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl justify-start">
            <PublishAction
              isAuthenticated={Boolean(token)}
              onPublish={handlePublish}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </Carousel>

      <div className="flex justify-center px-4 py-4 sm:hidden">
        <PublishAction
          isAuthenticated={Boolean(token)}
          onPublish={handlePublish}
        />
      </div>
    </section>
  );
}

export default CarouselHome;
