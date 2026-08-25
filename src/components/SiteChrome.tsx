import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { BrandWordmark } from "@/components/BrandMark";
import { AuthGateProvider, useAuthGate } from "@/components/AuthGate";
import { useDemoSession } from "@/lib/demo-session";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";


function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.087c.03-3.579.879-6.43 2.525-8.482C5.845 1.14 8.6 0 12.14 0c.04 0 .08 0 .12.002 3.58.024 6.333 1.205 8.184 3.509 1.644 2.054 2.494 4.908 2.522 8.484v.087c-.03 3.579-.879 6.43-2.525 8.482-1.85 2.3-4.603 3.44-8.143 3.44-.04 0-.08 0-.12-.002l.008.002zm-.008-21.6c-2.88.018-5.116.92-6.64 2.68-1.32 1.512-2.026 3.68-2.098 6.45.072 2.77.778 4.937 2.1 6.45 1.522 1.758 3.758 2.66 6.638 2.678 2.88-.018 5.116-.92 6.64-2.68 1.32-1.512 2.026-3.68 2.098-6.45-.072-2.77-.778-4.937-2.1-6.45-1.522-1.758-3.758-2.66-6.638-2.678z" />
      <path d="M17.01 10.26c-.18-.45-.45-.84-.81-1.17-.78-.72-1.95-1.05-3.45-.99-.12.01-.24.02-.36.03-.06.24-.12.48-.18.72-.06.24-.12.48-.18.72.12-.01.24-.02.36-.03 1.02-.04 1.74.15 2.16.57.24.24.39.54.45.9.06.36.06.78 0 1.26-.12.84-.33 1.62-.63 2.34-.3.72-.69 1.35-1.17 1.89-.48.54-1.05.96-1.71 1.26-.66.3-1.38.45-2.16.45-.78 0-1.47-.18-2.07-.54-.6-.36-1.05-.87-1.35-1.53-.3-.66-.45-1.44-.45-2.34 0-.9.15-1.68.45-2.34.3-.66.75-1.17 1.35-1.53.6-.36 1.29-.54 2.07-.54.18 0 .36.01.54.03.06-.24.12-.48.18-.72.06-.24.12-.48.18-.72-.24-.02-.48-.03-.72-.03-1.02 0-1.95.21-2.79.63-.84.42-1.5 1.02-1.98 1.8-.48.78-.81 1.68-.99 2.7-.18 1.02-.18 2.1 0 3.24.18 1.14.54 2.13 1.08 2.97.54.84 1.26 1.5 2.16 1.98.9.48 1.95.72 3.15.72 1.02 0 1.98-.21 2.88-.63.9-.42 1.68-1.02 2.34-1.8.66-.78 1.17-1.71 1.53-2.79.36-1.08.51-2.25.45-3.51-.03-.72-.12-1.38-.27-1.98z" />
    </svg>
  );
}

const publicLinks = [
  { to: "/buscar", label: "Buscar" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/sobre", label: "Sobre" },
] as const;

const gatedLinks = [{ to: "/mapa", label: "Mapa" }] as const;

export function SiteHeader() {
  const { go, isAuthenticated } = useAuthGate();
  const { session, signOut } = useDemoSession();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="min-w-0" aria-label={BRAND.name}>
          <BrandWordmark />
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-3">
          {gatedLinks.map((l) => (
            <button
              key={l.to}
              type="button"
              onClick={() => go(l.to)}
              className="eyebrow hidden px-2 py-1 hover:bg-secondary md:block"
            >
              {l.label}
            </button>
          ))}
          {publicLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="eyebrow hidden px-2 py-1 hover:bg-secondary md:block"
            >
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => go("/dashboard")}>
                {session?.username ? `@${session.username}` : "Painel"}
              </Button>
              <Button size="sm" variant="outline" className="border-2 border-ink" onClick={signOut}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/cadastro">Criar conta</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-status-sighted text-primary-foreground">
      <div className="marquee-track flex w-max gap-8 py-2">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="eyebrow whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase leading-none">{BRAND.name}</p>
          <p className="mt-2 text-sm text-primary-foreground/70">{BRAND.slogan}</p>
          <p className="mt-4 max-w-sm text-xs text-primary-foreground/60">
            Rede comunitária de busca por animais perdidos. Dados de demonstração nesta versão
            inicial.
          </p>
        </div>
        <FooterCol title="Plataforma" items={[{ to: "/buscar", label: "Buscar animais" }]} />
        <FooterCol title="Mapa" gated items={[{ to: "/mapa", label: "Mapa de ocorrências" }]} />
        <FooterCol
          title="Sinalizar"
          gated
          items={[
            { to: "/nova-ocorrencia", label: "Meu pet desapareceu" },
            { to: "/novo-avistamento", label: "Eu vi um animal" },
            { to: "/animal-encontrado", label: "Encontrei um animal" },
          ]}
        />

        <div>
          <p className="eyebrow text-primary-foreground/60">Redes sociais</p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/sinalizapet/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
                aria-label="Instagram do SinalizaPet"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.threads.com/@sinalizapet?xmt=AQG00g4SjtxGvTH3iWnecHaM346N7pQuwdv6FcW7FYVbvNE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
                aria-label="Threads do SinalizaPet"
              >
                <ThreadsIcon className="h-4 w-4" />
                Threads
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/SinalizaPet?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
                aria-label="Facebook do SinalizaPet"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/SinalizaPet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
                aria-label="X do SinalizaPet"
              >
                <Twitter className="h-4 w-4" />
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  gated,
}: {
  title: string;
  items: { to: string; label: string }[];
  gated?: boolean;
}) {
  const { go } = useAuthGate();
  return (
    <div>
      <p className="eyebrow text-primary-foreground/60">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            {gated ? (
              <button type="button" onClick={() => go(i.to)} className="hover:underline">
                {i.label}
              </button>
            ) : (
              <Link to={i.to} className="hover:underline">
                {i.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGateProvider>
      <div className="min-h-screen bg-background paper-grain">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </AuthGateProvider>
  );

}