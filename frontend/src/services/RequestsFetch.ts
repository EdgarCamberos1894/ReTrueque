import type {
  CommentsResponse,
  RequestsResponse,
  UserComment,
} from '@/lib/response';
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { token } = useAuthStore.getState();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API}${path}`, { ...init, headers });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `La solicitud fallo con estado ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchSentRequests(): Promise<RequestsResponse> {
  return apiRequest<RequestsResponse>('/api/v1/requests/sent');
}

export async function fetchReceivedRequests(): Promise<RequestsResponse> {
  return apiRequest<RequestsResponse>('/api/v1/requests/received');
}

export async function fetchUserComments(userId: number): Promise<CommentsResponse> {
  return apiRequest<CommentsResponse>(`/api/v1/requests/comments/user/${userId}?page=0&size=50`);
}

export async function updateRequestStatus(requestId: number, isConfirmed: boolean): Promise<void> {
  await apiRequest(`/api/v1/requests/${requestId}`, {
    method: 'PUT',
    body: JSON.stringify({ isConfirmed }),
  });
}

export async function reviewRequest(
  requestId: number,
  review: string,
  rating: number,
): Promise<UserComment> {
  const response = await apiRequest<{ data: UserComment }>(`/api/v1/requests/comments/${requestId}`, {
    method: 'PUT',
    body: JSON.stringify({ review, rating }),
  });
  return response.data;
}
