import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

const countries = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+65", name: "Singapore" },
  { code: "+61", name: "Australia" },
];

export function LoginModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [country, setCountry] = useState("+91");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!value.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const user = { type: "phone", value: `${country} ${value}` };
      try { localStorage.setItem("airbnb-clone-user", JSON.stringify(user)); } catch {}
      toast.success("Welcome back! 🎉", { duration: 2000 });
      setLoading(false);
      setTimeout(() => onOpenChange(false), 800);
    }, 700);
  };

  const social = (name: string) => {
    try { localStorage.setItem("airbnb-clone-user", JSON.stringify({ type: "social", value: name })); } catch {}
    toast.success(`Signed in with ${name}! 🎉`, { duration: 2000 });
    setTimeout(() => onOpenChange(false), 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-0 rounded-2xl overflow-hidden [&>button]:hidden">
        <div className="relative px-6 pt-6 pb-2 text-center border-b border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-8 pb-8 pt-4 space-y-6">
          <div className="flex justify-center">
            <svg viewBox="0 0 32 32" className="h-12 w-12 fill-primary">
              <path d="M16 0c1.1 0 2 .5 2.8 1.4.7.8 1.4 2 2.2 3.6.7 1.4 1.5 3.1 2.5 5.1.9 1.9 1.9 4 2.7 6.1.4 1 .8 2.1 1 3.1.3 1.1.4 2.1.4 3 0 3.4-1.3 6.1-3.5 7.9-1.8 1.5-4.2 2.3-6.9 2.4h-.4c-2.7-.1-5.1-.9-6.9-2.4-2.2-1.8-3.5-4.5-3.5-7.9 0-.9.1-1.9.4-3 .2-1 .6-2.1 1-3.1.8-2.1 1.8-4.2 2.7-6.1 1-2 1.8-3.7 2.5-5.1.8-1.6 1.5-2.8 2.2-3.6C14 .5 14.9 0 16 0zm0 3c-.2 0-.6.2-1.1.9-.6.7-1.2 1.8-2 3.3-.7 1.4-1.5 3-2.4 4.9-.9 1.9-1.8 3.9-2.6 5.9-.4.9-.7 1.9-.9 2.7-.2.8-.3 1.5-.3 2.1 0 2.3.8 4.1 2.3 5.4 1.3 1.1 3.1 1.7 5.3 1.8h.4c2.2-.1 4-.7 5.3-1.8 1.5-1.3 2.3-3.1 2.3-5.4 0-.6-.1-1.3-.3-2.1-.2-.8-.5-1.8-.9-2.7-.8-2-1.7-4-2.6-5.9-.9-1.9-1.7-3.5-2.4-4.9-.8-1.5-1.4-2.6-2-3.3C16.6 3.2 16.2 3 16 3zm0 6c1 1.5 1.9 3 2.6 4.4.6 1.3 1.1 2.5 1.1 3.5 0 2-1.6 3.6-3.7 3.7-2.1-.1-3.7-1.7-3.7-3.7 0-1 .5-2.2 1.1-3.5.7-1.4 1.6-2.9 2.6-4.4z" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-center">Log in or sign up</h1>

          <div className="border border-border rounded-xl overflow-hidden divide-x flex">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-transparent text-sm px-3 outline-none border-r border-border"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone number or email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            We'll send a confirmation code by text or email. Message and data rates apply.{" "}
            <a href="#" className="underline font-medium">Privacy Policy</a>
          </p>

          <Button
            onClick={handleContinue}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#E61E4D] to-[#D70466] hover:opacity-90 text-white font-semibold text-base"
          >
            {loading ? "Continuing…" : "Continue"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => social("Google")}
              className="h-14 w-14 rounded-full border border-border flex items-center justify-center hover:shadow-md transition"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0012 23z" />
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.05H2.18a11 11 0 000 9.9l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 00-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
              </svg>
            </button>
            <button
              onClick={() => social("Apple")}
              className="h-14 w-14 rounded-full border border-border flex items-center justify-center hover:shadow-md transition"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-foreground">
                <path d="M16.7 1c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-2.9.7-.8 1.9-1.4 3-1.5zM20.9 17.3c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.2-4 3.2-1.5 0-1.9-.9-3.9-.9s-2.5.9-3.9.9c-1.7 0-2.9-1.6-4-3-2.6-3.5-2.9-7.6-1.3-9.8 1.1-1.6 2.9-2.5 4.6-2.5 1.7 0 2.8 1 4.2 1 1.4 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3 1.4 9.2z" />
              </svg>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}