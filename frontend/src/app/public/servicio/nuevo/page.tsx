'use client';

import CreatService from '@/components/froms/CreatService'
import TopbarGeneral from '@/components/containers/topbar-general';
import useAuthHydrated from '@/hooks/useAuthHydrated';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'

export default function NewServicePage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const hasHydrated = useAuthHydrated();

    useEffect(() => {
        if (hasHydrated && !token) router.replace('/auth/login');
    }, [hasHydrated, router, token]);

    return (
        <>
            <TopbarGeneral />
            {!hasHydrated || !token
                ? <p className="mx-auto max-w-4xl px-4 py-10">Cargando...</p>
                : <CreatService />}
        </>
    )
}

