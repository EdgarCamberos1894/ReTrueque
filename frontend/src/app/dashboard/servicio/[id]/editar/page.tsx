'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopbarGeneral from '@/components/containers/topbar-general';
import ServiceForm from '@/components/froms/CreatService';
import useServiceForId from '@/hooks/useServiceForId';
import useAuthHydrated from '@/hooks/useAuthHydrated';
import { useAuthStore } from '@/store/auth';

export default function EditServicePage({ params }: { params: { id: number } }) {
  const serviceId = Number(params.id);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.id);
  const hasHydrated = useAuthHydrated();
  const { data, isLoading, isError } = useServiceForId(serviceId);
  const service = data?.data;

  useEffect(() => {
    if (hasHydrated && !token) {
      router.replace('/auth/login');
    } else if (hasHydrated && token && service && service.user.id !== userId) {
      router.replace(`/public/servicio/${service.id}`);
    }
  }, [hasHydrated, router, service, token, userId]);

  return (
    <>
      <TopbarGeneral />
      {(!hasHydrated || isLoading) && <p className="mx-auto max-w-4xl px-4 py-10">Cargando servicio...</p>}
      {isError && <p className="mx-auto max-w-4xl px-4 py-10 text-red-700">No se pudo cargar el servicio.</p>}
      {hasHydrated && token && service && service.user.id === userId && <ServiceForm service={service} />}
    </>
  );
}
