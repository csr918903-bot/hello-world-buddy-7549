import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, HeartPulse, MessageCircle, Salad, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nutrivida | Sua dieta reimaginada por IA" },
      {
        name: "description",
        content:
          "Converse com a IA da Nutrivida, receba um plano alimentar personalizado e acompanhe seu IMC em segundos.",
      },
      { property: "og:title", content: "Nutrivida | Sua dieta reimaginada por IA" },
      {
        property: "og:description",
        content:
          "Plano alimentar personalizado por IA, calculadora de IMC e assistente de nutrição em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PASSOS = [
  {
    numero: "01",
    titulo: "Dados Físicos",
    texto:
      "Coletamos dados como peso, idade e gênero, garantindo personalização total de forma segura.",
    icon: Activity,
  },
  {
    numero: "02",
    titulo: "Análise por IA",
    texto:
      "Nossos algoritmos processam suas informações para otimizar seu metabolismo e estilo de vida.",
    icon: Brain,
  },
  {
    numero: "03",
    titulo: "Plano Personalizado",
    texto: "Você recebe um guia alimentar prático, com receitas reais e seguras.",
    icon: Salad,
  },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero px-6 py-24 text-primary-foreground md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="size-3.5" /> Nutrição inteligente
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Sua dieta,
            <br />
            reimaginada por IA
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base opacity-85 md:text-lg">
            Converse com nossa IA e conte tudo sobre sua rotina, preferências e objetivos. Em
            segundos você recebe um plano alimentar personalizado.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/chatbot" className="btn-leaf">
              <MessageCircle className="size-4" /> Falar com a IA
            </Link>
            <Link
              to="/imc"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 px-6 py-3 font-semibold transition-smooth hover:bg-primary-foreground/10"
            >
              Calcular meu IMC
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Como Funciona</h2>
            <p className="mt-4 text-muted-foreground">
              Entenda o passo a passo da sua jornada: você responde algumas perguntas sobre sua
              vida, nossa IA analisa cada detalhe e, em seguida, você recebe um plano totalmente
              personalizado.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PASSOS.map((passo) => (
              <article
                key={passo.numero}
                className="surface-card p-7 transition-smooth hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-leaf text-leaf-foreground">
                    <passo.icon className="size-5" />
                  </span>
                  <span className="text-3xl font-bold text-accent-foreground/25">
                    {passo.numero}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary">{passo.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{passo.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SAÚDE INTEGRAL */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-soft p-8 shadow-card md:p-14">
          <div className="max-w-2xl">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-leaf text-leaf-foreground">
              <HeartPulse className="size-6" />
            </span>
            <h2 className="mt-6 text-3xl font-bold text-primary md:text-4xl">Saúde Integral</h2>
            <p className="mt-4 text-muted-foreground">
              Unimos a potência da inteligência artificial avançada ao olhar experiente de
              profissionais de nutrição humana. Criamos estratégias que mantêm a consistência e o
              prazer de comer bem em todas as fases da vida.
            </p>
            <Link to="/chatbot" className="btn-leaf mt-8">
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
