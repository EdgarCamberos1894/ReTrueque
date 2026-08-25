import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserComment } from '@/lib/response';

interface FooterProfileProps {
  comments: UserComment[];
  isLoading: boolean;
}

export default function FooterProfile({ comments, isLoading }: FooterProfileProps) {
  return (
    <section className="mt-10">
      <div className="border-b border-gray-300 pb-3">
        <h2 className="text-xl font-bold">Comentarios ({comments.length})</h2>
      </div>
      {isLoading ? (
        <p className="py-8 text-gray-600">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="py-8 text-gray-600">Este usuario aún no ha recibido comentarios.</p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
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
      )}
    </section>
  );
}
