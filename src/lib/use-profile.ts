import { useCallback, useEffect, useState } from "react";

export type Profile = {
  name: string;
  about: string;
  photo: string;
};

const NAME_KEY = "profileName";
const ABOUT_KEY = "profileAbout";
const PHOTO_KEY = "profilePhoto";

export const DEFAULT_NAME = "Nutrivida";
export const DEFAULT_PHOTO =
  "https://ui-avatars.com/api/?name=Nutri+Vida&background=1e473d&color=fff";

function read(): Profile {
  if (typeof window === "undefined") {
    return { name: DEFAULT_NAME, about: "", photo: DEFAULT_PHOTO };
  }
  return {
    name: localStorage.getItem(NAME_KEY) || DEFAULT_NAME,
    about: localStorage.getItem(ABOUT_KEY) || "",
    photo: localStorage.getItem(PHOTO_KEY) || DEFAULT_PHOTO,
  };
}

/**
 * Perfil salvo no navegador. Lido dentro de useEffect para não quebrar a
 * hidratação do SSR (ler localStorage direto no useState causa mismatch).
 */
export function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    name: DEFAULT_NAME,
    about: "",
    photo: DEFAULT_PHOTO,
  });

  useEffect(() => {
    setProfile(read());
    const sync = () => setProfile(read());
    window.addEventListener("storage", sync);
    window.addEventListener("nutrivida:profile", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("nutrivida:profile", sync);
    };
  }, []);

  const save = useCallback((next: Partial<Profile>) => {
    if (next.name !== undefined) localStorage.setItem(NAME_KEY, next.name);
    if (next.about !== undefined) localStorage.setItem(ABOUT_KEY, next.about);
    if (next.photo !== undefined) localStorage.setItem(PHOTO_KEY, next.photo);
    setProfile(read());
    window.dispatchEvent(new Event("nutrivida:profile"));
  }, []);

  return { profile, save };
}
