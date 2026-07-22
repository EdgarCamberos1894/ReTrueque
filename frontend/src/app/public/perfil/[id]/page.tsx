'use client';

import HeaderProfile from '../components/HeaderProfile';
import FooterProfile from '../components/FooterProfile';
import TopbarGeneral from '@/components/containers/topbar-general';
import useDataUser from '@/hooks/useDataUser';
import useServicesByIdUser from '@/hooks/useServicesByIdUser';
import { useUserComments } from '@/hooks/useRequests';

export default function UserProfile({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const { data, isLoading, isError } = useDataUser(id);
  const { data: servicesData, isLoading: isLoadingServices } = useServicesByIdUser(id);
  const { data: comments = [], isLoading: isLoadingComments } = useUserComments(id);

  if (isLoading) {
    return <><TopbarGeneral /><p className="mx-auto max-w-6xl px-4 py-12">Cargando perfil...</p></>;
  }
  if (isError || !data?.data) {
    return <><TopbarGeneral /><p className="mx-auto max-w-6xl px-4 py-12 text-red-700">No se pudo cargar el perfil.</p></>;
  }

  const user = {
    name: `${data.data.name} ${data.data.lastName}`.trim(),
    avatar: data.data.profileImageUrl || 'https://placehold.co/96x96/png',
    rating: data.data.averageRating ?? 0,
    description: [data.data.departamento, data.data.provincia].filter(Boolean).join(', '),
  };
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
        <HeaderProfile user={user} products={products} />
        <FooterProfile comments={comments} isLoading={isLoadingServices || isLoadingComments} />
      </main>
    </>
  );
}
