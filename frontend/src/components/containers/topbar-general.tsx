'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import useProfile from '@/hooks/useProfile'

// Topbar General para las demás interfaces de la página, no es flotante como el del home

const TopbarGeneral = () => {
  const authStatus = true
  const session = { nombre: 'Laura', apellido: 'Lopez' };
  const { token, clearAuth } = useAuthStore();
  const router = useRouter()
  const {data:profile, isLoading:isLoadingUser, error:errorUser} = useProfile()

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    clearAuth(); // Limpiar el estado de autenticación
    router.push('/'); // Redireccionar a la página de login o a la de inicio
  };

  return (
    <header className="w-full items-center justify-items-center text-justify">
      <div className="w-full bg-primary mx-0">
        <div className="flex h-full items-center gap-2 px-4">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer text-gray-50" onClick={() => router.push('/')}>
            <Image alt='logo' src="/logo.png" width={300} height={300} className="h-auto w-36 sm:w-52 lg:w-[300px]" />
          </div>
          <div className="hidden h-10 items-center justify-start gap-6 lg:inline-flex">
            <div className="w-[184px] justify-center items-center flex text-center hover:text-black text-[#fcfcfc] text-base font-bold leading-normal tracking-tight">
              <Link href='/public/nosotros' >SOBRE NOSOTROS</Link>
            </div>
            <div className="w-[184px] justify-center items-center flex text-center hover:text-black text-[#fcfcfc] text-base font-bold leading-normal tracking-tight">
              <Link href='/public/soporte' className="">SOPORTE</Link>
            </div>
          </div>
          {/* User Profile Button */}
          <div className="ml-auto flex items-center">
            {!token ? ( //Si no hay sesion
              <div className='flex items-center justify-items-end gap-2 text-sm text-black hover:text-gray-50 sm:gap-6 sm:text-base'>

                <Link href='/auth/registro'>
                  Registrarse</Link>

                <Button onClick={() => router.push('/auth/login')} variant="secondary" size="sm" className="">
                  Iniciar Sesión
                </Button>
              </div>
            ) : ( //Si hay sesion
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className='bg-white rounded-full p-1 flex flex-row items-center gap-2'>
                      <Image
                        src={profile?.profileImageUrl || '/img/userimg-default.jpg'}
                        alt='usrimg'
                        className='rounded-full'
                        height={30}
                        width={30}
                      />
                      <FaChevronDown />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='w-full h-full bg-secondary-variant-1'>
                    <div className="flex flex-col items-center gap-5">
                      <div>
                      {`${profile?.name || ''} ${profile?.lastname || ''}`.trim() || "Nuevo Usuario"}

                        <hr className='border-white w-full' />
                      </div>
                      <Link href={'/dashboard/perfil'} className='font-bold'>
                        Mi Perfil
                      </Link>
                      <Button variant='ghost' className='font-bold hover:bg-transparent' onClick={handleLogout}>
                        Cerrar Sesión
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopbarGeneral
