import Image from 'next/image';
import React from 'react';
import logort from '@/../public/logort.png';
import Link from 'next/link';
import { Contact } from '@/components/dialog/Contact';

const BASE_ROUTE = '/public'; // no quitar o si no da error de ruta

function FooterGeneral() {
  return (
    <footer className="w-full bg-primary-variant-2 p-6 sm:p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image src={logort} alt="RT" width={175} height={175} className="h-auto w-32 sm:w-[175px]" />
          <nav className="grid grid-cols-2 gap-x-5 gap-y-4 text-xs text-white sm:text-sm md:ml-auto md:flex md:flex-row md:gap-8">
            {/* Enlaces mapeados */}
            {[
              { href: '/', title: 'INICIO' },
              { href: '/public/nosotros', title: 'SOBRE NOSOTROS' },
              { href: '/public/soporte', title: 'SOPORTE' },
              { href: '/public/terminos', title: 'TÉRMINOS Y CONDICIONES' },
            ].map((item, i) => (
              <Link href={item.href} className="font-bold hover:text-black duration-500" key={i}>
                {item.title}
              </Link>
            ))}

            {/* Componente Contact con estilos */}
            <div className="font-bold hover:text-black duration-500 cursor-pointer">
              <Contact />
            </div>
          </nav>
        </div>
        <hr className="border border-white mt-4" />
        <div className="mt-2 md:ml-auto">
          <h3 className="text-xs text-white">
            © 2024 Retrueque - Todos los derechos reservados &nbsp;/&nbsp;
            <Link href="/public/legal" className="mr-2 hover:underline hover:font-bold">
              Aviso Legal
            </Link>{' '}
            -{' '}
            <Link href={`${BASE_ROUTE}/equipo/`} className="mx-2 hover:underline hover:font-bold">
              Equipo de Desarrollo
            </Link>{' '}
            -{' '}
            <Link href="public/privacidad" className="mx-2 hover:underline hover:font-bold">
              Política de Privacidad
            </Link>
          </h3>
        </div>
      </div>
    </footer>
  );
}

export default FooterGeneral;
