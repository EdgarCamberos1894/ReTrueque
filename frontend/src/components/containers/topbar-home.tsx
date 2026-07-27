'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthStore } from '@/store/auth';
import useProfile from '@/hooks/useProfile';

const TopbarHome = () => {
  const { token, clearAuth } = useAuthStore();
  const router = useRouter();
  const { data: profile } = useProfile();

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 rounded-xl bg-primary/95 px-3 py-2 shadow-lg backdrop-blur sm:gap-4 sm:px-5 sm:py-3">
        <Link
          href="/"
          aria-label="Ir al inicio de ReTrueque"
          className="flex shrink-0 items-center"
        >
          <Image
            alt="ReTrueque"
            src="/logo.png"
            width={300}
            height={100}
            priority
            className="h-auto w-28 sm:w-40 lg:w-52"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          <Link
            href="/public/nosotros"
            className="text-sm font-bold uppercase tracking-tight text-white transition-colors hover:text-black"
          >
            Sobre nosotros
          </Link>
          <Link
            href="/public/soporte"
            className="text-sm font-bold uppercase tracking-tight text-white transition-colors hover:text-black"
          >
            Soporte
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {!token ? (
            <>
              <Link
                href="/auth/registro"
                className="hidden text-sm font-bold text-black transition-colors hover:text-white sm:inline-flex"
              >
                Registrarse
              </Link>
              <Button
                onClick={() => router.push('/auth/login')}
                variant="secondary"
                size="sm"
                className="min-h-10 whitespace-nowrap px-3 font-bold sm:px-5"
              >
                Iniciar sesión
              </Button>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menú de usuario"
                  className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm"
                >
                  <Image
                    src={profile?.profileImageUrl || '/img/userimg-default.jpg'}
                    alt="Foto de perfil"
                    className="h-8 w-8 rounded-full object-cover"
                    height={32}
                    width={32}
                  />
                  <FaChevronDown className="mr-1 h-3 w-3" aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 bg-secondary-variant-1">
                <div className="flex flex-col gap-3">
                  <div className="border-b border-black/20 pb-3 font-bold">
                    {`${profile?.name || ''} ${profile?.lastname || ''}`.trim() || 'Nuevo usuario'}
                  </div>
                  <Link href="/dashboard/perfil" className="font-bold hover:underline">
                    Mi perfil
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start px-0 font-bold hover:bg-transparent"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Abrir navegación"
                className="shrink-0 text-black hover:bg-white/25 lg:hidden"
              >
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
              <nav aria-label="Navegación móvil" className="flex flex-col gap-4 font-bold">
                <Link href="/public/nosotros" className="hover:underline">
                  Sobre nosotros
                </Link>
                <Link href="/public/soporte" className="hover:underline">
                  Soporte
                </Link>
                {!token && (
                  <Link href="/auth/registro" className="hover:underline sm:hidden">
                    Registrarse
                  </Link>
                )}
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default TopbarHome;
