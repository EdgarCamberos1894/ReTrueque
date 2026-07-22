'use client';

import { useState } from 'react';
import { Check, Inbox, MessageSquare, Send, Star, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  useRequestStatusMutation,
  useReviewMutation,
} from '@/hooks/useRequests';
import type { ExchangeRequest, UserComment } from '@/lib/response';

type Tab = 'received' | 'sent' | 'comments';

interface FooterProfileProps {
  comments: UserComment[];
  receivedRequests: ExchangeRequest[];
  sentRequests: ExchangeRequest[];
  isLoading: boolean;
}

function StatusBadge({ status }: { status: boolean | null }) {
  const label = status === null ? 'Pendiente' : status ? 'Aceptada' : 'Rechazada';
  const styles = status === null
    ? 'border-amber-300 bg-amber-50 text-amber-800'
    : status
      ? 'border-green-300 bg-green-50 text-green-800'
      : 'border-red-300 bg-red-50 text-red-800';
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>{label}</span>;
}

export default function FooterProfile({
  comments,
  receivedRequests,
  sentRequests,
  isLoading,
}: FooterProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('received');
  const [reviewingRequest, setReviewingRequest] = useState<ExchangeRequest | null>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState('');
  const statusMutation = useRequestStatusMutation();
  const reviewMutation = useReviewMutation();

  const openReview = (request: ExchangeRequest) => {
    setReviewingRequest(request);
    setReview(request.review ?? '');
    setRating(request.rating ?? 5);
    setReviewError('');
  };

  const submitReview = async () => {
    if (!reviewingRequest || review.trim().length < 6) {
      setReviewError('La reseña debe tener al menos 6 caracteres.');
      return;
    }
    setReviewError('');
    try {
      await reviewMutation.mutateAsync({
        requestId: reviewingRequest.id,
        review: review.trim(),
        rating,
      });
      setReviewingRequest(null);
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'No se pudo guardar la reseña.');
    }
  };

  const tabs = [
    { id: 'received' as const, label: 'Recibidas', icon: Inbox, count: receivedRequests.length },
    { id: 'sent' as const, label: 'Enviadas', icon: Send, count: sentRequests.length },
    { id: 'comments' as const, label: 'Comentarios', icon: MessageSquare, count: comments.length },
  ];

  return (
    <section className="mt-10">
      <div className="flex overflow-x-auto border-b border-gray-300" role="tablist" aria-label="Actividad del perfil">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-w-fit flex-1 items-center justify-center gap-2 border-b-4 px-4 py-3 font-semibold ${activeTab === tab.id ? 'border-[#F6B404] bg-yellow-50' : 'border-transparent bg-white hover:bg-gray-50'}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="py-8 text-center text-gray-600">Cargando actividad...</p>
      ) : activeTab === 'comments' ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {comments.length === 0 && <p className="py-6 text-gray-600">Aún no has recibido comentarios.</p>}
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.imgUrl ?? undefined} alt={`${comment.name} ${comment.lastname}`} />
                  <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{comment.name} {comment.lastname}</h3>
                  <div className="flex" aria-label={`${comment.rating} de 5 estrellas`}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star key={value} className={`h-4 w-4 ${value <= comment.rating ? 'fill-[#F7C036] text-[#F6B404]' : 'text-gray-300'}`} aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-700">{comment.review}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {(activeTab === 'received' ? receivedRequests : sentRequests).length === 0 && (
            <p className="py-6 text-gray-600">No hay solicitudes en esta sección.</p>
          )}
          {(activeTab === 'received' ? receivedRequests : sentRequests).map((request) => {
            const person = activeTab === 'received' ? request.user : request.provider;
            const isUpdating = statusMutation.isPending && statusMutation.variables?.requestId === request.id;
            return (
              <article key={request.id} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 gap-3">
                    <Avatar className="h-11 w-11 shrink-0">
                      <AvatarImage src={person.img_profile ?? undefined} alt={`${person.name} ${person.last_name}`} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{person.name} {person.last_name}</h3>
                        <StatusBadge status={request.status} />
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#486f94]">{request.service?.title ?? 'Servicio'}</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">{request.description}</p>
                      <p className="mt-2 text-xs text-gray-500">{new Date(`${request.date}T00:00:00`).toLocaleDateString('es-MX')}</p>
                      {activeTab === 'sent' && request.status === true && request.provider.phone && (
                        <p className="mt-2 text-sm"><strong>Contacto:</strong> {request.provider.phone}</p>
                      )}
                    </div>
                  </div>

                  {activeTab === 'received' && request.status === null && (
                    <div className="flex shrink-0 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => statusMutation.mutate({ requestId: request.id, isConfirmed: false })}
                        disabled={isUpdating}
                      >
                        <X className="mr-1 h-4 w-4" aria-hidden="true" />
                        Rechazar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-700 text-white hover:bg-green-800"
                        onClick={() => statusMutation.mutate({ requestId: request.id, isConfirmed: true })}
                        disabled={isUpdating}
                      >
                        <Check className="mr-1 h-4 w-4" aria-hidden="true" />
                        Aceptar
                      </Button>
                    </div>
                  )}

                  {activeTab === 'sent' && request.status === true && (
                    <Button size="sm" variant="outline" onClick={() => openReview(request)}>
                      <Star className="mr-1 h-4 w-4" aria-hidden="true" />
                      {request.review ? 'Editar reseña' : 'Calificar'}
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
          {statusMutation.isError && <p className="text-sm text-red-700">No se pudo actualizar la solicitud.</p>}
        </div>
      )}

      <Dialog open={Boolean(reviewingRequest)} onOpenChange={(open) => !open && setReviewingRequest(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Calificar intercambio</DialogTitle>
            <DialogDescription>{reviewingRequest?.service?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-1" aria-label={`Calificación seleccionada: ${rating}`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#618FBA]"
                  aria-label={`${value} estrellas`}
                >
                  <Star className={`h-7 w-7 ${value <= rating ? 'fill-[#F7C036] text-[#F6B404]' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
            <Textarea
              value={review}
              onChange={(event) => setReview(event.target.value)}
              maxLength={255}
              placeholder="Describe tu experiencia"
            />
            {reviewError && <p role="alert" className="text-sm text-red-700">{reviewError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewingRequest(null)}>Cancelar</Button>
            <Button
              className="bg-[#F7C036] text-black hover:bg-[#F6B404]"
              onClick={submitReview}
              disabled={reviewMutation.isPending}
            >
              {reviewMutation.isPending ? 'Guardando...' : 'Guardar reseña'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
