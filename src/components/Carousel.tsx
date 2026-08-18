import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  tag: string;
  titulo: string;
  texto: string;
};

/** Slider bem simples feito na mão: setas, bolinhas e troca automática. */
export function Carousel({ slides, autoMs = 6000 }: { slides: Slide[]; autoMs?: number }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const ir = (i: number) => setAtual((i + slides.length) % slides.length);

  useEffect(() => {
    if (pausado || slides.length < 2) return;
    const t = setInterval(() => setAtual((a) => (a + 1) % slides.length), autoMs);
    return () => clearInterval(t);
  }, [pausado, slides.length, autoMs]);

  return (
    <div
      className="mx-auto w-full max-w-xl"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div
          className="flex transition-smooth"
          style={{ transform: `translateX(-${atual * 100}%)` }}
        >
          {slides.map((s) => (
            <article key={s.titulo} className="min-w-full px-8 py-7 text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-leaf">
                {s.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-primary">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.texto}</p>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Anterior"
          onClick={() => ir(atual - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 text-primary transition-smooth hover:bg-accent"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Próximo"
          onClick={() => ir(atual + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 text-primary transition-smooth hover:bg-accent"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.titulo}
            type="button"
            aria-label={`Ir para o aviso ${i + 1}`}
            onClick={() => setAtual(i)}
            className={`h-2 rounded-full transition-smooth ${
              i === atual ? "w-6 bg-leaf" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
