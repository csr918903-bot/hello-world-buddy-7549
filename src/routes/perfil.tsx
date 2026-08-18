import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Settings, ShieldCheck, UserRound } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProfile } from "@/lib/use-profile";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil | Nutrivida" },
      {
        name: "description",
        content:
          "Atualize seu nome, sua foto e suas informações pessoais para personalizar sua experiência na Nutrivida.",
      },
      { property: "og:title", content: "Meu perfil | Nutrivida" },
      {
        property: "og:description",
        content: "Personalize seu perfil Nutrivida com foto, nome e informações sobre você.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

const TABS = [
  { id: "profile", label: "Perfil", icon: UserRound },
  { id: "account", label: "Conta", icon: ShieldCheck },
  { id: "advanced", label: "Avançado", icon: Settings },
] as const;

const MAX_FOTO_BYTES = 2 * 1024 * 1024;

function Perfil() {
  const { profile, save } = useProfile();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("profile");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(profile.photo);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    setName(profile.name === "Nutrivida" ? "" : profile.name);
    setAbout(profile.about);
    setPhoto(profile.photo);
  }, [profile]);

  const trocarFoto = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setAviso("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > MAX_FOTO_BYTES) {
      setAviso("A imagem precisa ter no máximo 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;
      setPhoto(result);
      save({ photo: result });
      setAviso("Foto atualizada!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <SiteLayout>
      <section className="bg-gradient-soft px-4 py-12 md:py-16">
        <div className="surface-card mx-auto max-w-3xl p-7 md:p-10">
          <h1 className="text-3xl font-bold text-primary">Meu Perfil</h1>

          <div className="mt-7 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-smooth ${
                  tab === t.id
                    ? "bg-gradient-leaf text-leaf-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <t.icon className="size-4" /> {t.label}
              </button>
            ))}
          </div>

          {tab === "profile" && (
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                save({ name: name.trim() || "Nutrivida", about });
                setAviso("Perfil salvo com sucesso!");
                navigate({ to: "/" });
              }}
            >
              <div className="flex flex-wrap items-center gap-6">
                <img
                  src={photo}
                  alt="Sua foto de perfil"
                  className="size-28 rounded-full border-4 border-leaf object-cover"
                />
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) trocarFoto(file);
                    }}
                  />
                  <button
                    type="button"
                    className="btn-outline-leaf"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Camera className="size-4" /> Selecionar foto
                  </button>
                  <p className="mt-2 text-xs text-muted-foreground">PNG ou JPG, até 2 MB.</p>
                </div>
              </div>

              <input
                className="field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                aria-label="Nome"
              />

              <textarea
                className="field h-28 resize-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Sobre você"
                aria-label="Sobre você"
              />

              <button type="submit" className="btn-leaf w-full">
                Salvar perfil
              </button>

              {aviso && <p className="text-sm font-medium text-leaf">{aviso}</p>}
            </form>
          )}

          {tab === "account" && (
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setAviso("Dados de conta serão sincronizados quando o login estiver ativo.");
              }}
            >
              <input className="field" type="email" placeholder="Email" aria-label="Email" />
              <input className="field" type="text" placeholder="Usuário" aria-label="Usuário" />
              <input
                className="field"
                type="password"
                placeholder="Senha"
                aria-label="Senha"
                autoComplete="new-password"
              />
              <input
                className="field"
                type="password"
                placeholder="Confirmar senha"
                aria-label="Confirmar senha"
                autoComplete="new-password"
              />
              <button type="submit" className="btn-leaf w-full">
                Salvar conta
              </button>
              {aviso && <p className="text-sm font-medium text-leaf">{aviso}</p>}
            </form>
          )}

          {tab === "advanced" && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-primary">Configurações avançadas</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mais opções estarão disponíveis em breve.
              </p>
              <button
                type="button"
                className="btn-outline-leaf mt-6"
                onClick={() => {
                  localStorage.removeItem("profileName");
                  localStorage.removeItem("profileAbout");
                  localStorage.removeItem("profilePhoto");
                  save({});
                  setAviso("Dados locais apagados.");
                }}
              >
                Limpar meus dados salvos
              </button>
              {aviso && <p className="mt-4 text-sm font-medium text-leaf">{aviso}</p>}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
