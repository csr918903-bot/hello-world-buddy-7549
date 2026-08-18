import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProfile } from "@/lib/use-profile";
import { avatarDe, formatarData, useCommunity } from "@/lib/use-community";

export const Route = createFileRoute("/usuario/$nome")({
  head: () => ({
    meta: [
      { title: "Perfil da comunidade | Nutrivida" },
      {
        name: "description",
        content:
          "Veja a conta de um membro da comunidade Nutrivida e todas as ideias de dieta que ele já publicou.",
      },
      { property: "og:title", content: "Perfil da comunidade | Nutrivida" },
      {
        property: "og:description",
        content: "Conheça os membros da comunidade Nutrivida e suas publicações.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UsuarioPublico;
});

function UsuarioPublico() {
  const { nome } = useParams({ from: "/usuario/$nome" });
  const { profile } = useProfile();
  const { posts } = useCommunity();

  const meus = posts.filter((p) => p.autor === nome);
  const curtidas = meus.reduce((t, p) => t + p.curtidas, 0);
  const comentarios = meus.reduce((t, p) => t + p.comentarios.length, 0);
  const souEu = nome === profile.name;
  const foto = souEu ? profile.photo : avatarDe(nome);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 py-12">
        <Link
          to="/comunidade"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Voltar para a comunidade
        </Link>

        <div className="surface-card mt-6 flex flex-col items-center p-8 text-center">
          <img
            src={foto}
            alt={`Foto de ${nome}`}
            className="size-24 rounded-full border-4 border-accent object-cover"
          />
          <h1 className="mt-4 text-2xl font-bold text-primary">{nome}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {souEu && profile.about ? profile.about : "Membro da comunidade Nutrivida"}
          </p>

          <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-3">
            <Estatistica valor={meus.length} label="posts" />
            <Estatistica valor={curtidas} label="curtidas" />
            <Estatistica valor={comentarios} label="comentários" />
          </div>

          {souEu && (
            <Link to="/perfil" className="btn-outline-leaf mt-6">
              Editar meu perfil
            </Link>
          )}
        </div>

        <h2 className="mt-10 text-lg font-semibold text-primary">Publicações</h2>

        <div className="mt-4 flex flex-col gap-4">
          {meus.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {souEu
                ? "Você ainda não publicou nada. Vá para a comunidade e compartilhe uma ideia!"
                : "Esse membro ainda não publicou nada."}
            </p>
          )}

          {meus.map((post) => (
            <article key={post.id} className="surface-card p-5">
              <span className="text-xs text-muted-foreground">{formatarData(post.data)}</span>
              <h3 className="mt-1 text-base font-semibold text-primary">{post.titulo}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {post.texto}
              </p>
              <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="size-4" /> {post.curtidas}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="size-4" /> {post.comentarios.length}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Estatistica({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-4">
      <span className="block text-xl font-bold text-primary">{valor}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
