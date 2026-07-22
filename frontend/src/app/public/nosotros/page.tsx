import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Repeat2, UsersRound } from 'lucide-react';
import TopbarGeneral from '@/components/containers/topbar-general';
import { Button } from '@/components/ui/button';

const values = [
  {
    title: 'Reciprocidad',
    description: 'Cada persona tiene algo valioso para aportar y algo nuevo por descubrir.',
    icon: Repeat2,
  },
  {
    title: 'Comunidad',
    description: 'Los intercambios crean vínculos cercanos, confianza y colaboración.',
    icon: UsersRound,
  },
  {
    title: 'Crecimiento',
    description: 'Compartir conocimientos abre oportunidades para aprender y avanzar juntos.',
    icon: Lightbulb,
  },
];

export default function AboutUs() {
  return (
    <>
      <TopbarGeneral />
      <main className="bg-white text-black">
        <section className="border-b border-black/10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-14">
            <div className="max-w-xl">
              <p className="text-[13px] font-bold uppercase leading-5 text-[#527DA5]">Sobre nosotros</p>
              <h1 className="mt-2 text-display-small-bold">Retrueque</h1>
              <p className="mt-4 text-md font-bold">
                Una comunidad para intercambiar lo que sabes hacer.
              </p>
              <div className="mt-5 space-y-4 text-xs text-neutral-700">
                <p>
                  Creemos que compartir habilidades y conocimientos es una forma poderosa de
                  construir comunidad y generar valor.
                </p>
                <p>
                  Creamos un espacio donde las personas pueden ofrecer y recibir servicios mediante
                  el trueque, sin que el dinero sea una barrera.
                </p>
              </div>
              <Button asChild variant="secondary" className="mt-7 gap-2 font-bold">
                <Link href="/public/searchCategorys">
                  Explorar servicios
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/img/bg_nosotros.png"
                width={599}
                height={575}
                sizes="(max-width: 1024px) 80vw, 440px"
                alt="Personas uniendo sus manos como símbolo de colaboración"
                className="h-auto w-full max-w-[420px] object-contain"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-[#EAF4FC]">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="max-w-2xl">
              <h2 className="text-md font-bold">
                Lo que nos mueve
              </h2>
              <p className="mt-2 text-xs text-neutral-700">
                El valor de ReTrueque nace de las personas y de lo que construyen juntas.
              </p>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-3 md:gap-8">
              {values.map(({ title, description, icon: Icon }) => (
                <div key={title} className="border-t-2 border-[#F6B404] pt-5">
                  <Icon className="h-6 w-6 text-[#527DA5]" aria-hidden="true" />
                  <h3 className="mt-3 text-[18px] font-bold leading-6">{title}</h3>
                  <p className="mt-2 text-xs text-neutral-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#FFF8DC]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h2 className="text-[20px] font-bold leading-7">Tu experiencia también tiene valor.</h2>
              <p className="mt-1 text-xs text-neutral-700">
                Súmate a una comunidad que crece compartiendo.
              </p>
            </div>
            <Button asChild className="w-full font-bold md:w-auto">
              <Link href="/public/servicio/nuevo">Publicar un servicio</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
