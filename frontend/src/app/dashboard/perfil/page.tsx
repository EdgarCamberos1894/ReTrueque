'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderProfile from './components/HeaderProfile';
import FooterProfile from './components/FooterProfile';
import TopbarGeneral from '@/components/containers/topbar-general';
import useDataUser from '@/hooks/useDataUser';
import useProfile from '@/hooks/useProfile';
import useServicesByIdUser from '@/hooks/useServicesByIdUser';
import { useReceivedRequests, useSentRequests, useUserComments } from '@/hooks/useRequests';
import useAuthHydrated from '@/hooks/useAuthHydrated';
import { useAuthStore } from '@/store/auth';

export default function UserProfile() {
  const token = useAuthStore((state) => state.token);
  const id = useAuthStore((state) => state.id);
  const hasHydrated = useAuthHydrated();
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useProfile();
  const { data: publicUser } = useDataUser(id);
  const { data: servicesData, isLoading: isLoadingServices } = useServicesByIdUser(id);
  const { data: sentRequests = [], isLoading: isLoadingSent } = useSentRequests();
  const { data: receivedRequests = [], isLoading: isLoadingReceived } = useReceivedRequests();
  const { data: comments = [], isLoading: isLoadingComments } = useUserComments(id);

  useEffect(() => {
    if (hasHydrated && !token) router.replace('/auth/login');
  }, [hasHydrated, router, token]);

  if (!hasHydrated || !token || isLoadingUser) {
    return (
      <>
        <TopbarGeneral />
        <p className="mx-auto max-w-6xl px-4 py-12 text-center">Cargando perfil...</p>
      </>
    );
  }

  const products = servicesData?.data.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    imag: service.imgUrl ?? '',
  })) ?? [];

  return (
    <>
      <TopbarGeneral />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <HeaderProfile
          user={{
            name: `${user?.name ?? ''} ${user?.lastname ?? ''}`.trim() || 'Usuario',
            profileImagUrl: user?.profileImageUrl,
            rating: publicUser?.data.averageRating ?? 0,
            ubicacion: user?.provincia && user?.departamento
              ? `${user.provincia}, ${user.departamento}`
              : 'Ubicación sin actualizar',
          }}
          products={products}
        />
        <FooterProfile
          comments={comments}
          receivedRequests={receivedRequests}
          sentRequests={sentRequests}
          isLoading={isLoadingServices || isLoadingSent || isLoadingReceived || isLoadingComments}
        />
      </main>
    </>
  );
}
