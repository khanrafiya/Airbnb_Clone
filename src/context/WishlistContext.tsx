import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type WishlistCtx = {
  wishlist: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const Ctx = createContext<WishlistCtx | null>(null);
const KEY = "airbnb-clone-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWishlist(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const toggle = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const has = (id: string) => wishlist.includes(id);

  return <Ctx.Provider value={{ wishlist, toggle, has }}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used within WishlistProvider");
  return c;
}
