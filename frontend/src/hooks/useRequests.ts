'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchReceivedRequests,
  fetchSentRequests,
  fetchUserComments,
  reviewRequest,
  updateRequestStatus,
} from '@/services/RequestsFetch';
import { useAuthStore } from '@/store/auth';

export function useSentRequests() {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['requests', 'sent'],
    queryFn: fetchSentRequests,
    select: (response) => response.data ?? [],
    enabled: Boolean(token),
  });
}

export function useReceivedRequests() {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['requests', 'received'],
    queryFn: fetchReceivedRequests,
    select: (response) => response.data ?? [],
    enabled: Boolean(token),
  });
}

export function useUserComments(userId: number) {
  return useQuery({
    queryKey: ['comments', userId],
    queryFn: () => fetchUserComments(userId),
    select: (response) => response.data.content ?? [],
    enabled: userId > 0,
  });
}

export function useRequestStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, isConfirmed }: { requestId: number; isConfirmed: boolean }) =>
      updateRequestStatus(requestId, isConfirmed),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['requests', 'received'] }),
        queryClient.invalidateQueries({ queryKey: ['requests', 'sent'] }),
      ]);
    },
  });
}

export function useReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, review, rating }: { requestId: number; review: string; rating: number }) =>
      reviewRequest(requestId, review, rating),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['requests', 'sent'] }),
        queryClient.invalidateQueries({ queryKey: ['comments'] }),
      ]);
    },
  });
}
