'use client'

import {useQuery} from '@tanstack/react-query'
import {ProfileFetch} from '@/services/ProfileFetch'
import { useAuthStore } from '@/store/auth'

export default function useProfile() {
    const token = useAuthStore((state) => state.token)
    return useQuery({
        queryKey: ['profile'],
        queryFn:()=> ProfileFetch(),
        select: (data) => data?.data,
        enabled: Boolean(token),
    })
}
