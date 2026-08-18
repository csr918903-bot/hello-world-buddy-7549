import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { responder, SUGESTOES } from "@/lib/nutri-chat";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Assistente Nutri | Chatbot de nutrição da Nutrivida" },
      {
        name: "description",
        content:
          "Converse com o Assistente Nutri e tire dúvidas sobre dietas, emagrecimento, hipertrofia e alimentação saudável.",
      },
      { property: "og:title", content: "Assistente Nutri | Chatbot da Nutrivida" },
      {
        property: "og:description",
        content: "Tire dúvidas de nutrição em segundos com o assistente da Nutrivida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Chatbot,
});

type Msg = { id: number; text: string; from: "user" | "bot" };

function Chatbot() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, text: "Olá! Pergunte algo sobre nutrição.", from: "bot" },
  ]);
  const [value, setValue] = useState("");
  const [digitando, setDigitando] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, digitando]);

  const enviar = (texto: string) => {
    const limpo = texto.trim();
    if (!limpo) return;

    setMsgs((prev) => [...prev, { id: idRef.current++, text: limpo, from: "user" }]);
    setValue("");
    setDigitando(true);

    window.setTimeout(() => {
      setMsgs((prev) => [...prev, { id: idRef.current++, text: responder(limpo), from: "bot" }]);
      setDigitando(false);
    }, 450);
  };

  return (
    <SiteLayout>
      <section className="bg-gradient-soft px-4 py-12 md:py-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="surface-card overflow-hidden">
            <header className="flex items-center gap-3 bg-gradient-hero px-6 py-5 text-primary-foreground">
              <span className="grid size-10 place-items-center rounded-full bg-primary-foreground/15">
                <Bot className="size-5" />
              </span>
              <div>
                <h1 className="text-lg font-semibold">Assistente Nutri</h1>
                <p className="text-xs opacity-80">Online • responde na hora</p>
              </div>
            </header>

            <div ref={outputRef} className="h-[420px] space-y-3 overflow-y-auto bg-muted/50 p-5">
              {msgs.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.from === "bot" && (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-leaf text-leaf-foreground">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <p
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
                      msg.from === "user"
                        ? "rounded-br-md bg-gradient-leaf text-leaf-foreground"
                        : "rounded-bl-md bg-card text-card-foreground"
                    }`}
                  >
                    {msg.text}
                  </p>
                  {msg.from === "user" && (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <User className="size-4" />
                    </span>
                  )}
                </div>
              ))}

              {digitando && (
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-gradient-leaf text-leaf-foreground">
                    <Bot className="size-4" />
                  </span>
                  <span className="rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm text-muted-foreground shadow-soft">
                    digitando…
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-card p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGESTOES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => enviar(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  enviar(value);
                }}
                className="flex gap-2"
              >
                <input
                  className="field"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Digite sua mensagem"
                  aria-label="Mensagem"
                />
                <button type="submit" className="btn-leaf px-5" aria-label="Enviar">
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
