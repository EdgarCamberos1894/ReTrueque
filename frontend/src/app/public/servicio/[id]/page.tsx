"use client";
import { useParams } from "next/navigation";
import React from "react";
import RelatedServices from "../_components/RelatedServices";
import ServiceCard from "../_components/ServiceCard";
import TopbarGeneral from "@/components/containers/topbar-general";
import useServiceForId from "@/hooks/useServiceForId";


const Page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data, isLoading, isError, error } = useServiceForId(id);

  if (isLoading) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>Error: {error?.message}</p>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>No se encontraron detalles del servicio.</p>
      </div>
    );
  }
  

  const serviceProps = {
    id: data.data.id,
    idUser: data.data.user.id,
    title: data?.data?.title ?? 'Título no disponible',
    description: data?.data?.description ?? 'Descripción no disponible',
    rules: data?.data?.rules ?? 'Sin intereses especificados',
    image: data?.data?.imgUrl || "https://placehold.co/571x416/png",
    userName: data?.data?.user?.username ?? 'Usuario no disponible',
    category: data?.data?.category?.name ?? 'Categoría no disponible',
    province: data?.data?.provincia?.name || 'Provincia no disponible',
    department: data?.data?.departamento?.name || 'Departamento no disponible',
    days: data.data.days ?? [],
    shiftTime: data.data.shiftTime ?? [],
  };

  const categoryId = data?.data?.category?.id ?? -1;

  return (
    <>
      <TopbarGeneral />
      <section className="w-full max-w-[1232px] mx-auto m-10 p-10">
        <section>
          <ServiceCard {...serviceProps} />
        </section>
        <section>
        <RelatedServices categoryId={categoryId} />
        </section>
      </section></>
  );
};

export default Page;
