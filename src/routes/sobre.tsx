import { createFileRoute, Link } from "@tanstack/react-router";
import loganSobre from "@/assets/logan-sobre.jpg.asset.json";
import { BRAND } from "@/lib/brand";
import { SiteLayout } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — SinalizaPet" },
      {
        name: "description",
        content:
          "A história do SinalizaPet: uma rede comunitária criada a partir da busca por Logan, um gato preto que inspirou a plataforma.",
      },
      { property: "og:title", content: "Sobre o SinalizaPet" },
      {
        property: "og:description",
        content: "Nasceu de uma busca real. Virou uma rede de informação útil para animais perdidos.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="border-b-2 border-ink bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="eyebrow text-primary-foreground/60">Sobre</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
              Tudo começou<br />com o Logan
            </h1>
            <p className="mt-5 max-w-xl text-primary-foreground/80">
              Antes de existir um sistema, uma marca ou uma ideia de projeto, existia apenas um
              gatinho preto chamado Logan e uma história que mudou a forma como enxergamos a busca por
              um animal perdido. Foi a partir dessa história, da dor e da sensação de impotência
              diante de uma situação em que tudo o que podíamos fazer parecia pouco, que surgiu a
              vontade de transformar essa experiência em uma ferramenta de ajuda para outras
              pessoas.
              <br />
              <br />
              Foi assim que nasceu o Sinaliza Pet.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs border-2 border-ink bg-paper p-6">
            <img
              src={loganSobre.url}
              alt="Logan, o gato preto que inspirou o SinalizaPet"
              className="mx-auto aspect-square w-full object-cover"
            />
            <p className="mt-4 text-center text-sm font-semibold text-ink">
              Em homenagem ao Logan
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-muted-foreground">A história</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none sm:text-4xl">
            Sobre o Sinaliza Pet
          </h2>
          <div className="poster mt-6 grid gap-6 p-6 text-base leading-relaxed text-foreground/85 sm:p-8 md:grid-cols-2">
            <div className="grid gap-4">
              <p>
                O Sinaliza Pet nasceu de uma história que começou com a perda de um companheiro muito
                especial. No dia 19 de maio de 2025, o Logan, um gatinho preto que fazia parte da nossa
                família desde março de 2021, desapareceu. Durante sete dias, fizemos o que estava ao nosso
                alcance para encontrá-lo: procuramos, publicamos nas redes sociais, compartilhamos sua foto,
                pedimos ajuda e tentamos alcançar o maior número possível de pessoas. No dia 26 de maio,
                finalmente encontramos o Logan, mas infelizmente já sem vida. Essa experiência deixou não
                apenas a dor da perda, mas também uma reflexão sobre como poderia ser mais fácil organizar
                e ampliar uma busca quando um animal desaparece.
              </p>
              <p>
                As informações acabam espalhadas entre redes sociais, grupos de mensagens e publicações
                individuais, enquanto muitas pessoas podem ter visto o animal sem sequer saber que alguém
                está procurando por ele. Foi dessa experiência que nasceu o Sinaliza Pet: uma iniciativa
                criada para transformar essa sensação de impotência em uma ferramenta de ajuda.
              </p>
            </div>
            <div className="grid gap-4">
              <p>
                O projeto busca reunir pessoas em torno de uma mesma causa, criando um espaço onde animais
                desaparecidos possam ser divulgados, avistamentos possam ser sinalizados e informações
                possam alcançar quem realmente pode fazer a diferença. O gatinho preto presente na
                identidade do Sinaliza Pet representa o Logan e carrega consigo a origem de tudo isso.
              </p>
              <p>
                Mais do que um símbolo, ele representa a memória de um animal que foi muito amado e a
                inspiração para criar algo que possa ajudar outras famílias a terem uma história diferente
                da nossa. O Sinaliza Pet nasce, portanto, de uma experiência pessoal, mas não pertence
                apenas a ela. Ele é pensado para todos aqueles que já perderam, encontraram, procuraram ou
                simplesmente pararam para ajudar um animal. Porque, quando um pet desaparece, cada pessoa
                que sinaliza, compartilha ou presta atenção pode fazer parte do caminho de volta para casa.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Informação organizada",
              text: "Cada ocorrência tem linha do tempo, avistamentos e status claro.",
            },
            {
              title: "Comunidade no centro",
              text: "Quem sinaliza é parte da busca, com reconhecimento no perfil.",
            },
            {
              title: "Respeito às pessoas",
              text: "Localização aproximada, contato mediado e moderação ativa.",
            },
          ].map((c) => (
            <div key={c.title} className="poster p-5">
              <h2 className="text-lg font-extrabold uppercase leading-tight">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="poster mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-extrabold uppercase leading-tight">
            {BRAND.slogan}
          </p>
          <Button asChild size="lg" className="border-2 border-ink">
            <Link to="/cadastro">Entrar na rede</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}