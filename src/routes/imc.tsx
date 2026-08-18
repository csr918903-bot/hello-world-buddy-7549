import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Scale } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/imc")({
  head: () => ({
    meta: [
      { title: "Calculadora de IMC | Nutrivida" },
      {
        name: "description",
        content:
          "Calcule seu IMC em segundos e veja em qual faixa de classificação você está, com a tabela oficial da OMS.",
      },
      { property: "og:title", content: "Calculadora de IMC | Nutrivida" },
      {
        property: "og:description",
        content: "Descubra seu Índice de Massa Corporal e a classificação correspondente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Imc,
});

const FAIXAS = [
  { faixa: "< 17", classificacao: "Muito abaixo do peso" },
  { faixa: "17 – 18,4", classificacao: "Abaixo do peso" },
  { faixa: "18,5 – 24,9", classificacao: "Peso normal" },
  { faixa: "25 – 29,9", classificacao: "Sobrepeso" },
  { faixa: "30 – 34,9", classificacao: "Obesidade I" },
  { faixa: "35 – 39,9", classificacao: "Obesidade II" },
  { faixa: "40+", classificacao: "Obesidade III" },
];

function faixaDoImc(imc: number) {
  if (imc < 17) return 0;
  if (imc < 18.5) return 1;
  if (imc < 25) return 2;
  if (imc < 30) return 3;
  if (imc < 35) return 4;
  if (imc < 40) return 5;
  return 6;
}

function Imc() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  const calcular = () => {
    const p = Number(peso);
    const a = Number(altura);

    if (!p || !a) {
      setErro("Preencha peso e altura para calcular.");
      setImc(null);
      return;
    }
    if (p <= 0 || p > 500 || a < 50 || a > 250) {
      setErro("Use um peso entre 1 e 500 kg e uma altura entre 50 e 250 cm.");
      setImc(null);
      return;
    }

    setErro("");
    setImc(p / ((a / 100) * (a / 100)));
  };

  const indice = imc === null ? -1 : faixaDoImc(imc);

  return (
    <SiteLayout>
      <section className="bg-gradient-soft px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 md:flex-row">
          <div className="surface-card w-full p-7 md:max-w-sm">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-leaf text-leaf-foreground">
              <Scale className="size-5" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-primary">Calculadora de IMC</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Informe seu peso e altura para ver sua classificação.
            </p>

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                calcular();
              }}
            >
              <input
                className="field"
                type="number"
                inputMode="decimal"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso (kg)"
                aria-label="Peso em quilos"
              />
              <input
                className="field"
                type="number"
                inputMode="decimal"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Altura (cm)"
                aria-label="Altura em centímetros"
              />
              <button type="submit" className="btn-leaf w-full">
                Calcular
              </button>
            </form>

            {erro && <p className="mt-4 text-sm font-medium text-destructive">{erro}</p>}

            {imc !== null && (
              <div className="mt-5 rounded-xl bg-accent p-4 text-accent-foreground">
                <p className="text-sm">Seu IMC</p>
                <p className="text-3xl font-bold">{imc.toFixed(2)}</p>
                <p className="mt-1 text-sm font-medium">{FAIXAS[indice]?.classificacao}</p>
              </div>
            )}
          </div>

          <div className="surface-card w-full flex-1 p-7">
            <h2 className="text-center text-lg font-semibold text-primary">
              Classificação do IMC
            </h2>

            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="rounded-l-lg px-4 py-3 text-left font-semibold">IMC</th>
                  <th className="rounded-r-lg px-4 py-3 text-left font-semibold">Classificação</th>
                </tr>
              </thead>
              <tbody>
                {FAIXAS.map((linha, i) => (
                  <tr
                    key={linha.faixa}
                    className={`border-b border-border transition-smooth ${
                      i === indice ? "bg-accent font-semibold text-accent-foreground" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{linha.faixa}</td>
                    <td className="px-4 py-3">{linha.classificacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-5 text-xs text-muted-foreground">
              O IMC é um indicador geral e não substitui a avaliação de um profissional de saúde.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
