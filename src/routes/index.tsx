import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Carousel, type Slide } from "@/components/Carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nutrivida | Sua dieta reimaginada por IA" },
      {
        name: "description",
        content:
          "Novidades da Nutrivida, chatbot de nutrição, calculadora de IMC e a comunidade de ideias de dieta.",
      },
      { property: "og:title", content: "Nutrivida | Sua dieta reimaginada por IA" },
      {
        property: "og:description",
        content:
          "Veja as atualizações da Nutrivida e participe da comunidade de ideias de dieta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const AVISOS: Slide[] = [
  {
    tag: "Novidade",
    titulo: "Comunidade no ar 🎉",
    texto:
      "Agora dá pra postar suas ideias de dieta, comentar nos posts do pessoal e ver o perfil de cada um.",
  },
  {
    tag: "Atualização",
    titulo: "Chatbot mais esperto",
    texto:
      "Arrumamos as respostas sobre emagrecimento, ganho de massa e receitas. Ele confunde menos as perguntas agora.",
  },
  {
    tag: "Ajuste",
    titulo: "Calculadora de IMC arrumada",
    texto: "A tabela ficou correta e a calculadora avisa quando o peso ou a altura não faz sentido.",
  },
  {
    tag: "Em breve",
    titulo: "Foto nos posts",
    texto: "Estamos preparando o upload de imagem nas publicações da comunidade. Aguarde!",
  },
];

function Home() {
  return (
    <SiteLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-grid size-12 place-items-center rounded-2xl bg-gradient-leaf text-leaf-foreground">
            <Leaf className="size-6" />
          </span>

          <h1 className="mt-5 text-3xl font-bold text-primary md:text-4xl">
            Bem-vindo à Nutrivida
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Aqui a gente avisa tudo que muda no site. Dá uma olhada nas últimas atualizações:
          </p>
        </div>

        <div className="mt-10">
          <Carousel slides={AVISOS} />
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
          <Link to="/comunidade" className="btn-leaf">
            Ver a comunidade
          </Link>
          <Link to="/chatbot" className="btn-outline-leaf">
            Falar com a IA
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
