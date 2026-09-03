import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, Search } from "lucide-react";

import { ALL_CITIES, CitySelect } from "@/components/CitySelect";
import { GatedArea, useAuthGate } from "@/components/AuthGate";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { DemoNote } from "@/components/FormKit";
import { statusLabel } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { demoOccurrences } from "@/data/demo";
import type { OccurrenceStatus, Species } from "@/types";

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

export const cityOptions = Array.from(new Set(demoOccurrences.map((o) => o.city))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

export function OccurrenceSearch({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const { isAuthenticated } = useAuthGate();
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState<Species | "todas">("todas");
  const [status, setStatus] = useState<OccurrenceStatus | "todos">("todos");
  const [city, setCity] = useState<string>(ALL_CITIES);

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
      const matchCity = city === ALL_CITIES || o.city === city;
      return matchQuery && matchSpecies && matchStatus && matchCity;
    });
  }, [query, species, status, city]);

  const visible = typeof limit === "number" ? results.slice(0, limit) : results;

  return (
    <>
      <div className="poster mb-6 grid gap-4 p-4 text-left sm:p-5">
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

        <FilterRow label="Cidade">
          <CitySelect cities={cityOptions} value={city} onChange={setCity} />
        </FilterRow>

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

        <DemoNote>Busca aplicada sobre dados de demonstração.</DemoNote>
      </div>

      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="eyebrow">
          {results.length} {results.length === 1 ? "ocorrência" : "ocorrências"}
          {city !== ALL_CITIES ? ` em ${city}` : ""}
        </p>
        {showAllLink && (
          <Button asChild variant="outline" size="sm" className="gap-1 border-2 border-ink">
            <Link to="/buscar">
              Busca completa <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {!isAuthenticated && (
        <p className="mb-4 flex items-center gap-2 border-2 border-ink bg-accent px-4 py-3 text-left text-sm">
          <LockKeyhole className="h-4 w-4 shrink-0" />
          Ver os detalhes de uma ocorrência exige login ou criação de conta.
        </p>
      )}

      {visible.length === 0 ? (
        <div className="poster p-8 text-center">
          <p className="font-display text-lg font-extrabold uppercase">Nada por aqui</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente outra cidade ou remova algum filtro.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {visible.map((o) => (
            <GatedArea key={o.id} to={`/ocorrencia/${o.id}`}>
              <OccurrenceCard occurrence={o} />
            </GatedArea>
          ))}
        </div>
      )}
    </>
  );
}

export function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Chip({
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
