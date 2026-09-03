import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, House, LockKeyhole, MapPin, Search, Siren } from "lucide-react";

import { BRAND } from "@/lib/brand";

import { Button } from "@/components/ui/button";
import { GatedArea, useAuthGate } from "@/components/AuthGate";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { MapCanvas, MapLegend } from "@/components/MapCanvas";
import { Marquee, SiteLayout } from "@/components/SiteChrome";
import { demoAdminStats, demoOccurrences } from "@/data/demo";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        name: "description",
        content:
          "Rede comunitária de busca por animais perdidos: abra uma ocorrência, sinalize avistamentos e acompanhe o mapa do seu bairro.",
      },
      { property: "og:title", content: "SinalizaPet — Viu? Sinaliza. Encontrou? Avisa." },
      {
        property: "og:description",
        content:
          "Uma informação pode ser a diferença entre um animal continuar perdido e voltar para casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <SiteLayout>
      <LandingContent />
    </SiteLayout>
  );
}

function LandingContent() {
  const { go, isAuthenticated } = useAuthGate();
  const highlights = demoOccurrences.filter((o) => o.status !== "obito").slice(0, 4);

  return (
    <>

      <Marquee
        items={[
          "PROJETO EM CONSTRUÇÃO",
          "PROJETO EM CONSTRUÇÃO",
          "PROJETO EM CONSTRUÇÃO",
          "PROJETO EM CONSTRUÇÃO",
        ]}
      />

      {/* HERO */}
      <section className="border-b-2 border-ink bg-accent/50">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="absolute inset-0 sand-grid opacity-50" aria-hidden />
          <div className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 text-xs">
                <span className="h-2 w-2 bg-status-missing" /> REDE COMUNITÁRIA DE DIVULGAÇÃO E BUSCA
              </span>
              <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
                Ajude um
                <br />
                animal perdido
                <br />
                <span className="mt-1 inline-block bg-ink px-3 py-0.5 text-primary-foreground">a voltar pra casa</span>
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base text-foreground/80">
                O SinalizaPet transforma informação solta em pista útil: cada avistamento entra na
                linha do tempo da ocorrência e avisa o tutor na hora.
              </p>

              <div className="poster mt-8 p-4 shadow-lift">
                <p className="eyebrow">O que você precisa fazer?</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <Button
                    onClick={() => go("/nova-ocorrencia")}
                    className="h-auto flex-col items-start gap-1 whitespace-normal border-2 border-ink bg-status-missing px-3 py-3 text-left leading-tight text-primary-foreground hover:bg-status-missing/90"
                  >
                    <Siren className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-bold">Meu pet desapareceu</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => go("/novo-avistamento")}
                    className="h-auto flex-col items-start gap-1 whitespace-normal border-2 border-ink bg-status-sighted px-3 py-3 text-left leading-tight text-primary hover:bg-status-sighted/80"
                  >
                    <Eye className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-bold">Eu vi um animal</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => go("/animal-encontrado")}
                    className="h-auto flex-col items-start gap-1 whitespace-normal border-2 border-ink bg-status-found px-3 py-3 text-left leading-tight text-primary-foreground hover:bg-status-found/90"
                  >
                    <House className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-bold">Encontrei um animal</span>
                  </Button>
                </div>
                <a
                  href="#buscar"
                  className="mt-3 flex w-full items-center gap-3 border-2 border-ink bg-paper px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <Search className="h-4 w-4 shrink-0" />
                  <span className="truncate">Procure por um animal, cidade ou bairro...</span>
                </a>

                {!isAuthenticated && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <LockKeyhole className="h-3.5 w-3.5 shrink-0" />
                    A busca é livre. Para sinalizar ou abrir uma ocorrência, entre ou crie sua conta.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* NÚMEROS */}
      <section className="border-b-2 border-ink bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {[
            { label: "Ocorrências ativas", value: demoAdminStats.activeOccurrences },
            { label: "Sinalizações", value: demoAdminStats.sightings },
            { label: "Reencontros", value: demoAdminStats.reunited },
            { label: "Pessoas na rede", value: demoAdminStats.users },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-black leading-none">{s.value}</p>
              <p className="eyebrow mt-2 text-primary-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-extrabold uppercase leading-none sm:text-4xl">
          Três passos, nada de burocracia
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              icon: Siren,
              title: "Sinalize em minutos",
              text: "Formulário curto, feito para o celular e para momentos de estresse.",
            },
            {
              n: "02",
              icon: MapPin,
              title: "Localização aproximada",
              text: "Ocorrências aparecem por bairro e raio, nunca no endereço exato.",
            },
            {
              n: "03",
              icon: Eye,
              title: "A rede responde",
              text: "Cada avistamento entra na linha do tempo e notifica o tutor na hora.",
            },
          ].map((f) => (
            <div key={f.title} className="poster p-5">
              <div className="flex items-center justify-between">
                <f.icon className="h-6 w-6" />
                <span className="font-display text-3xl font-black text-ink/15">{f.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold uppercase leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-6 gap-2">
          <Link to="/como-funciona">
            Ver o passo a passo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* MURAL */}
      <section className="border-y-2 border-ink bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <h2 className="truncate text-3xl font-extrabold uppercase leading-none sm:text-4xl">
              Mural recente
            </h2>
            <Button asChild variant="outline" size="sm" className="gap-1 border-2 border-ink">
              <Link to="/buscar">
                Ver todas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((o) => (
              <GatedArea key={o.id} to={`/ocorrencia/${o.id}`}>
                <OccurrenceCard occurrence={o} />
              </GatedArea>
            ))}
          </div>
          {!isAuthenticated && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <LockKeyhole className="h-4 w-4 shrink-0" />
              Buscar é livre. Entre para abrir a ocorrência, falar com o tutor e sinalizar.
            </p>
          )}
        </div>
      </section>

      {/* MAPA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-extrabold uppercase leading-none sm:text-4xl">
          O que está acontecendo por perto
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Marcadores por status, sempre em localização aproximada.
        </p>
        <GatedArea to="/mapa" className="mt-6">
          <MapCanvas occurrences={demoOccurrences} className="h-[380px]" />
          <div className="mt-4">
            <MapLegend />
          </div>
        </GatedArea>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-ink bg-status-missing text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none sm:text-4xl">
              Viu um animal na rua?
            </h2>
            <p className="mt-2 text-primary-foreground/85">
              Leva menos de dois minutos e pode encerrar uma busca de semanas.
            </p>
          </div>
          <Button
            size="lg"
            className="border-2 border-ink bg-paper text-ink hover:bg-paper/90"
            onClick={() => go("/novo-avistamento")}
          >
            Sinalizar agora
          </Button>
        </div>
      </section>
    </>
  );

}