import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export interface ServicePayload {
  title: string;
  description: string;
  rules: string;
  image?: File | null;
  categoryId: number;
  days: number[];
  shiftTime: number[];
}

export async function saveService(payload: ServicePayload, serviceId?: number): Promise<void> {
  const { token } = useAuthStore.getState();
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('rules', payload.rules);
  formData.append('categoryId', payload.categoryId.toString());
  formData.append('days', payload.days.join(','));
  formData.append('shiftTime', payload.shiftTime.join(','));
  if (payload.image) {
    formData.append('imgUrl', payload.image);
  }

  const response = await fetch(
    `${API}/api/v1/service${serviceId ? `/${serviceId}` : ''}`,
    {
      method: serviceId ? 'PUT' : 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudo guardar el servicio.');
  }
}
