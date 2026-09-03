import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SiteLayout } from "@/components/SiteChrome";
import { AuthGateProvider } from "@/components/AuthGate";
import { OccurrenceSearch } from "@/components/OccurrenceSearch";
import { useDemoSession } from "@/lib/demo-session";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar animais — SinalizaPet" },
      {
        name: "description",
        content:
          "Busque animais desaparecidos, avistados e encontrados por cidade, espécie, status e bairro.",
      },
      { property: "og:title", content: "Buscar animais — SinalizaPet" },
      {
        property: "og:description",
        content: "Filtre o mural por cidade, espécie e status para achar a ocorrência certa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

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
  return (
    <>
      <PageHeader
        title="Buscar"
        description="Busca livre, sem login. Selecione a cidade e filtre por espécie e status."
      />
      <OccurrenceSearch />
    </>
  );
}
