import { useCallback, useEffect, useState } from "react";

export type Comentario = {
  id: string;
  autor: string;
  texto: string;
  data: string;
};

export type Post = {
  id: string;
  autor: string;
  titulo: string;
  texto: string;
  data: string;
  curtidas: number;
  comentarios: Comentario[];
};

const KEY = "nutrivida:posts";
const EVENT = "nutrivida:posts-change";

const SEED: Post[] = [
  {
    id: "p1",
    autor: "Marina Alves",
    titulo: "Café da manhã que me segura até o almoço",
    texto:
      "Ovos mexidos com 2 fatias de pão integral, meio abacate e um café sem açúcar. Simples, barato e eu não sinto fome antes do meio-dia.",
    data: "2026-08-10T09:12:00.000Z",
    curtidas: 12,
    comentarios: [
      {
        id: "c1",
        autor: "Rafael Lima",
        texto: "Testei ontem e funcionou demais, obrigado!",
        data: "2026-08-10T12:40:00.000Z",
      },
    ],
  },
  {
    id: "p2",
    autor: "Rafael Lima",
    titulo: "Marmita de domingo para a semana toda",
    texto:
      "Faço arroz integral, frango desfiado e legumes assados no domingo à noite. Divido em 5 potes. Gasto 1h e paro de pedir delivery na correria.",
    data: "2026-08-12T18:05:00.000Z",
    curtidas: 27,
    comentarios: [],
  },
  {
    id: "p3",
    autor: "Bianca Souza",
    titulo: "Truque para beber mais água",
    texto:
      "Deixo uma garrafa de 1L na mesa e marco com caneta os horários. Se está atrasado eu bebo. Já cheguei em 2,5L por dia sem sofrimento.",
    data: "2026-08-14T08:30:00.000Z",
    curtidas: 8,
    comentarios: [
      {
        id: "c2",
        autor: "Marina Alves",
        texto: "Vou fazer isso hoje, sempre esqueço de beber água.",
        data: "2026-08-14T10:02:00.000Z",
      },
      {
        id: "c3",
        autor: "Nutrivida",
        texto: "Boa! Água antes das refeições também ajuda na saciedade.",
        data: "2026-08-14T11:15:00.000Z",
      },
    ],
  },
];

function ler(): Post[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return SEED;
    const dados = JSON.parse(raw) as Post[];
    return Array.isArray(dados) ? dados : SEED;
  } catch {
    return SEED;
  }
}

function gravar(posts: Post[]) {
  localStorage.setItem(KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event(EVENT));
}

function novoId() {
  return Math.random().toString(36).slice(2, 10);
}

export function formatarData(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useCommunity() {
  const [posts, setPosts] = useState<Post[]>(SEED);

  useEffect(() => {
    setPosts(ler());
    const sync = () => setPosts(ler());
    window.addEventListener("storage", sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(EVENT, sync);
    };
  }, []);

  const publicar = useCallback((autor: string, titulo: string, texto: string) => {
    const post: Post = {
      id: novoId(),
      autor,
      titulo,
      texto,
      data: new Date().toISOString(),
      curtidas: 0,
      comentarios: [],
    };
    gravar([post, ...ler()]);
  }, []);

  const curtir = useCallback((id: string) => {
    gravar(ler().map((p) => (p.id === id ? { ...p, curtidas: p.curtidas + 1 } : p)));
  }, []);

  const comentar = useCallback((id: string, autor: string, texto: string) => {
    gravar(
      ler().map((p) =>
        p.id === id
          ? {
              ...p,
              comentarios: [
                ...p.comentarios,
                { id: novoId(), autor, texto, data: new Date().toISOString() },
              ],
            }
          : p,
      ),
    );
  }, []);

  const apagar = useCallback((id: string) => {
    gravar(ler().filter((p) => p.id !== id));
  }, []);

  return { posts, publicar, curtir, comentar, apagar };
}

export function avatarDe(nome: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=2e7d32&color=fff`;
}
