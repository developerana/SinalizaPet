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

const SOCIALS = [
  {
    label: "Instagram",
    value: "@sinalizapet",
    href: "https://www.instagram.com/sinalizapet/",
    Icon: Instagram,
  },
  {
    label: "Threads",
    value: "@sinalizapet",
    href: "https://www.threads.com/@sinalizapet?xmt=AQG00g4SjtxGvTH3iWnecHaM346N7pQuwdv6FcW7FYVbvNE",
    Icon: ThreadsIcon,
  },
  {
    label: "Facebook",
    value: "SinalizaPet",
    href: "https://www.facebook.com/SinalizaPet?locale=pt_BR",
    Icon: Facebook,
  },
  {
    label: "X (Twitter)",
    value: "@SinalizaPet",
    href: "https://x.com/SinalizaPet",
    Icon: Twitter,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground sm:px-10 sm:py-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                Vamos ajudar juntos?
              </h2>
              <p className="mt-3 max-w-md text-sm text-primary-foreground/90">
                Siga o SinalizaPet nas redes e ajude a espalhar cada sinal de animal perdido.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {SOCIALS.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                  aria-label={`${label} do SinalizaPet`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/15 text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-primary-foreground/70">{label}</span>
                    <span className="block truncate text-sm font-bold group-hover:underline">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-primary-foreground/15 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold uppercase leading-none">
              {BRAND.name}
            </p>
            <p className="mt-2 text-sm text-primary-foreground/70">{BRAND.slogan}</p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-primary-foreground/60">
              Rede comunitária de busca por animais perdidos. Dados de demonstração nesta versão
              inicial.
            </p>
          </div>
          <FooterCol
            title="Plataforma"
            gated
            items={[
              { to: "/buscar", label: "Buscar animais", public: true },
              { to: "/mapa", label: "Mapa de ocorrências" },
            ]}
          />
          <FooterCol
            title="Sinalizar"
            gated
            items={[
              { to: "/nova-ocorrencia", label: "Meu pet desapareceu" },
              { to: "/novo-avistamento", label: "Eu vi um animal" },
              { to: "/animal-encontrado", label: "Encontrei um animal" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.</p>
          <p>Feito pela comunidade, para os animais.</p>
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
  items: { to: string; label: string; public?: boolean }[];
  gated?: boolean;
}) {
  const { go } = useAuthGate();
  return (
    <div>
      <p className="eyebrow text-primary-foreground/60">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            {gated && !i.public ? (
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