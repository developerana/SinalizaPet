import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole, Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SiteLayout } from "@/components/SiteChrome";
import { AuthGateProvider, GatedArea, useAuthGate } from "@/components/AuthGate";
import { useDemoSession } from "@/lib/demo-session";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { DemoNote } from "@/components/FormKit";
import { Input } from "@/components/ui/input";
import { statusLabel } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { demoOccurrences } from "@/data/demo";
import type { OccurrenceStatus, Species } from "@/types";


export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar animais — SinalizaPet" },
      {
        name: "description",
        content:
          "Busque animais desaparecidos, avistados e encontrados por espécie, status, bairro e distância aproximada.",
      },
      { property: "og:title", content: "Buscar animais — SinalizaPet" },
      {
        property: "og:description",
        content: "Filtre o mural por espécie, status e distância para achar a ocorrência certa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const speciesOptions: { value: Species | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "cachorro", label: "Cachorro" },
  { value: "gato", label: "Gato" },
  { value: "ave", label: "Ave" },
  { value: "outro", label: "Outro" },
];

const statusOptions: (OccurrenceStatus | "todos")[] = [
  "todos",
  "desaparecido",
  "avistado",
  "encontrado",
  "reencontrado",
];

const distances = [1, 3, 5, 10] as const;

function SearchPage() {
  const { isAuthenticated } = useDemoSession();
  if (isAuthenticated) {
    return (
      <AppShell>
        <AuthGateProvider>
          <SearchContent />
        </AuthGateProvider>
      </AppShell>
    );
  }
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SearchContent />
      </div>
    </SiteLayout>
  );
}

function SearchContent() {
  const { isAuthenticated } = useAuthGate();
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState<Species | "todas">("todas");
  const [status, setStatus] = useState<OccurrenceStatus | "todos">("todos");
  const [radius, setRadius] = useState<number>(10);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoOccurrences.filter((o) => {
      const matchQuery =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.neighborhood.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.summary.toLowerCase().includes(q);
      const matchSpecies = species === "todas" || o.species === species;
      const matchStatus = status === "todos" || o.status === status;
      return matchQuery && matchSpecies && matchStatus && o.distanceKm <= radius;
    });
  }, [query, species, status, radius]);

  return (
    <>
      <PageHeader
        title="Buscar"
        description="Busca livre, sem login. Filtre o mural por espécie, status e distância aproximada."
      />

      <div className="poster mb-6 grid gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-2 border-2 border-ink bg-secondary px-3">
          <Search className="h-4 w-4 shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Animal, bairro ou região..."
            aria-label="Buscar"
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <FilterRow label="Espécie">
          {speciesOptions.map((s) => (
            <Chip key={s.value} active={species === s.value} onClick={() => setSpecies(s.value)}>
              {s.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Status">
          {statusOptions.map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s === "todos" ? "Todos" : statusLabel[s]}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Distância">
          {distances.map((d) => (
            <Chip key={d} active={radius === d} onClick={() => setRadius(d)}>
              até {d} km
            </Chip>
          ))}
        </FilterRow>

        <DemoNote>Busca aplicada sobre dados de demonstração.</DemoNote>
      </div>

      <p className="eyebrow mb-3">
        {results.length} {results.length === 1 ? "ocorrência" : "ocorrências"}
      </p>

      {!isAuthenticated && (
        <p className="mb-4 flex items-center gap-2 border-2 border-ink bg-accent px-4 py-3 text-sm">
          <LockKeyhole className="h-4 w-4 shrink-0" />
          Ver os detalhes de uma ocorrência exige login ou criação de conta.
        </p>
      )}

      {results.length === 0 ? (
        <div className="poster p-8 text-center">
          <p className="font-display text-lg font-extrabold uppercase">Nada por aqui</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente ampliar a distância ou remover algum filtro.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {results.map((o) => (
            <GatedArea key={o.id} to={`/ocorrencia/${o.id}`}>
              <OccurrenceCard occurrence={o} />
            </GatedArea>
          ))}
        </div>
      )}
    </>
  );
}


function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-2 border-ink px-3 py-1.5 text-xs font-semibold transition-colors",
        active ? "bg-ink text-primary-foreground" : "bg-paper hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}