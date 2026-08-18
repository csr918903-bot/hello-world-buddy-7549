import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, Leaf, Menu, X } from "lucide-react";
import { useProfile } from "@/lib/use-profile";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/perfil", label: "Perfil" },
  { to: "/login", label: "Login" },
  { to: "/imc", label: "IMC" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { profile } = useProfile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/90 px-5 py-3 backdrop-blur-md md:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-leaf text-leaf-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="text-lg">Nutrivida</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notificações"
            className="relative rounded-lg p-2 text-primary transition-smooth hover:bg-accent"
          >
            <Bell className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gradient-leaf text-[10px] font-bold text-leaf-foreground">
              2
            </span>
          </button>

          <Link to="/perfil" aria-label="Perfil">
            <img
              src={profile.photo}
              alt={`Foto de ${profile.name}`}
              className="size-9 rounded-full border border-border object-cover"
            />
          </Link>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-primary transition-smooth hover:bg-accent md:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-smooth md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[300px] max-w-[85vw] overflow-y-auto bg-sidebar p-6 shadow-card transition-smooth md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="ml-auto flex rounded-lg p-2 text-sidebar-foreground transition-smooth hover:bg-sidebar-accent"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center gap-2 pb-8 pt-2 text-center">
          <Link to="/perfil">
            <img
              src={profile.photo}
              alt={`Foto de ${profile.name}`}
              className="size-24 rounded-full border-4 border-sidebar-primary object-cover"
            />
          </Link>
          <h3 className="text-xl font-semibold text-sidebar-primary">{profile.name}</h3>
          <span className="text-sm text-muted-foreground">Seja bem vindo</span>
        </div>

        <p className="mb-4 text-xs font-bold tracking-widest text-muted-foreground">GERAL</p>
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block rounded-lg px-3 py-3 text-base text-sidebar-foreground transition-smooth hover:bg-sidebar-accent data-[status=active]:bg-sidebar-accent data-[status=active]:font-semibold"
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main>{children}</main>

      <footer className="mt-20 bg-gradient-hero px-6 py-14 text-primary-foreground">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Leaf className="size-5" /> Nutrivida
            </div>
            <p className="mt-3 max-w-xs text-sm opacity-80">
              Sua rota para o bem-estar através de planos nutricionais inteligentes e
              personalizados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Navegação</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm opacity-80">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-smooth hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Contato</h4>
            <p className="mt-3 text-sm opacity-80">contato@nutrivida.ai</p>
            <p className="text-sm opacity-80">Brasil</p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-5xl border-t border-primary-foreground/20 pt-6 text-xs opacity-70">
          © 2026 Nutrivida. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
