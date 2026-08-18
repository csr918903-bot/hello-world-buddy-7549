import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, LogIn } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProfile } from "@/lib/use-profile";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta | Nutrivida" },
      {
        name: "description",
        content:
          "Acesse sua conta Nutrivida ou crie a sua em poucos passos para salvar seu plano alimentar personalizado.",
      },
      { property: "og:title", content: "Entrar ou criar conta | Nutrivida" },
      {
        property: "og:description",
        content: "Crie sua conta Nutrivida e guarde seu plano alimentar personalizado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const PASSOS = ["Conta", "Dados", "Objetivo"] as const;

function Login() {
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [passo, setPasso] = useState(0);
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const { save } = useProfile();
  const navigate = useNavigate();

  const concluir = () => {
    if (!nome.trim()) {
      setErro("Informe seu nome para continuar.");
      setPasso(1);
      return;
    }
    setErro("");
    save({ name: nome.trim() });
    navigate({ to: "/" });
  };

  return (
    <SiteLayout>
      <section className="bg-gradient-soft px-4 py-12 md:py-16">
        <div className="surface-card mx-auto max-w-md p-7 md:p-9">
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-leaf text-leaf-foreground">
            <LogIn className="size-5" />
          </span>

          <h1 className="mt-5 text-2xl font-bold text-primary">
            {modo === "entrar" ? "Entrar na Nutrivida" : "Criar sua conta"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {modo === "entrar"
              ? "Bem-vindo de volta! Continue de onde parou."
              : "Três passos rápidos e seu plano começa."}
          </p>

          <div className="mt-6 flex gap-2">
            {(["entrar", "criar"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setModo(m);
                  setPasso(0);
                  setErro("");
                }}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-smooth ${
                  modo === m
                    ? "bg-gradient-leaf text-leaf-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {m === "entrar" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          {modo === "entrar" ? (
            <form
              className="mt-7 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/" });
              }}
            >
              <input
                className="field"
                type="text"
                placeholder="Usuário ou email"
                aria-label="Usuário ou email"
                autoComplete="username"
              />
              <input
                className="field"
                type="password"
                placeholder="Senha"
                aria-label="Senha"
                autoComplete="current-password"
              />
              <button type="submit" className="btn-leaf w-full">
                Entrar
              </button>
            </form>
          ) : (
            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                concluir();
              }}
            >
              <div className="mb-6 flex items-center gap-2">
                {PASSOS.map((p, i) => (
                  <div key={p} className="flex flex-1 flex-col gap-1.5">
                    <span
                      className={`h-1.5 rounded-full transition-smooth ${
                        i <= passo ? "bg-leaf" : "bg-muted"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-medium ${
                        i <= passo ? "text-leaf" : "text-muted-foreground"
                      }`}
                    >
                      {p}
                    </span>
                  </div>
                ))}
              </div>

              {passo === 0 && (
                <div className="space-y-3">
                  <input
                    className="field"
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                  />
                  <input
                    className="field"
                    type="password"
                    placeholder="Crie uma senha"
                    aria-label="Crie uma senha"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {passo === 1 && (
                <div className="space-y-3">
                  <input
                    className="field"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    aria-label="Seu nome"
                  />
                  <div className="flex gap-3">
                    <input
                      className="field"
                      type="number"
                      placeholder="Idade"
                      aria-label="Idade"
                    />
                    <input
                      className="field"
                      type="number"
                      placeholder="Peso (kg)"
                      aria-label="Peso em quilos"
                    />
                  </div>
                </div>
              )}

              {passo === 2 && (
                <div className="space-y-3">
                  <select className="field" aria-label="Objetivo" defaultValue="emagrecer">
                    <option value="emagrecer">Emagrecer</option>
                    <option value="manter">Manter o peso</option>
                    <option value="massa">Ganhar massa muscular</option>
                  </select>
                  <textarea
                    className="field h-24 resize-none"
                    placeholder="Restrições ou preferências alimentares"
                    aria-label="Restrições ou preferências alimentares"
                  />
                </div>
              )}

              {erro && <p className="mt-3 text-sm font-medium text-destructive">{erro}</p>}

              <div className="mt-6 flex gap-3">
                {passo > 0 && (
                  <button
                    type="button"
                    className="btn-outline-leaf flex-1"
                    onClick={() => setPasso((s) => s - 1)}
                  >
                    <ArrowLeft className="size-4" /> Voltar
                  </button>
                )}

                {passo < PASSOS.length - 1 ? (
                  <button
                    type="button"
                    className="btn-leaf flex-1"
                    onClick={() => setPasso((s) => s + 1)}
                  >
                    Avançar <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button type="submit" className="btn-leaf flex-1">
                    <Check className="size-4" /> Criar conta
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
