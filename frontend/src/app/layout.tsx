import type { Metadata } from 'next';
import { lato } from '@/font/google';
import './globals.css';
import ProvidersTanstack from '@/context/ProvidersTanstack';
import FooterGeneral from '@/components/containers/footer-general';

export const metadata: Metadata = {
  title: 'ReTrueque',
  description: 'Intercambia servicios y habilidades dentro de la comunidad de ReTrueque.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${lato.className} min-h-screen`}>
        <ProvidersTanstack>
          {children}
          <FooterGeneral />
        </ProvidersTanstack>
      </body>
    </html>
  );
}
