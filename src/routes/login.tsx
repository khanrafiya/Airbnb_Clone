import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail, Facebook, Apple, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in or sign up" },
      { name: "description", content: "Log in or sign up to continue booking your stay." },
    ],
  }),
  component: LoginPage,
});

function Logo() {
  return (
    <div className="flex items-center gap-1 text-primary">
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden>
        <path d="M16 1C7.7 1 1 7.7 1 16s6.7 15 15 15 15-6.7 15-15S24.3 1 16 1zm0 27c-6.6 0-12-5.4-12-12S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12zm5-14c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z" />
      </svg>
      <span className="text-2xl font-bold tracking-tight">airbnb</span>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [country, setCountry] = useState("India (+91)");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = mode === "email"
        ? { type: "email", value: email }
        : { type: "phone", value: `${country} ${phone}` };
      try { localStorage.setItem("airbnb-clone-user", JSON.stringify(user)); } catch {}
      toast.success("Welcome back!");
      setLoading(false);
      navigate({ to: "/" });
    }, 700);
  };

  const social = (name: string) => () => {
    try { localStorage.setItem("airbnb-clone-user", JSON.stringify({ type: "social", value: name })); } catch {}
    toast.success(`Signed in with ${name}`);
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Back to homes
          </Link>
          <Logo />
          <div className="w-32" />
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="border-b border-border px-6 py-4 text-center">
            <h1 className="font-semibold text-lg">Log in or sign up</h1>
          </div>

          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Welcome to Airbnb</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "phone" ? (
                <>
                  <div className="border border-border rounded-t-lg overflow-hidden divide-y divide-border">
                    <div className="px-3 py-2">
                      <Label className="text-[10px] font-semibold text-muted-foreground">COUNTRY/REGION</Label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                      >
                        <option>India (+91)</option>
                        <option>United States (+1)</option>
                        <option>United Kingdom (+44)</option>
                        <option>Singapore (+65)</option>
                        <option>Australia (+61)</option>
                      </select>
                    </div>
                    <div className="px-3 py-2">
                      <Label className="text-[10px] font-semibold text-muted-foreground">PHONE NUMBER</Label>
                      <Input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-0 shadow-none focus-visible:ring-0 h-6 px-0 text-sm"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
                    <a href="#" className="underline font-medium">Privacy Policy</a>
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label className="text-[10px] font-semibold text-muted-foreground">EMAIL</Label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] font-semibold text-muted-foreground">PASSWORD</Label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
              >
                {loading ? "Continuing…" : "Continue"}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              <SocialButton icon={<div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-400" />} label="Continue with Google" onClick={social("Google")} />
              <SocialButton icon={<Apple className="h-5 w-5 fill-current" />} label="Continue with Apple" onClick={social("Apple")} />
              <SocialButton icon={<Facebook className="h-5 w-5 fill-[#1877F2] text-[#1877F2]" />} label="Continue with Facebook" onClick={social("Facebook")} />
              <SocialButton
                icon={mode === "email" ? <Phone className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                label={mode === "email" ? "Continue with phone" : "Continue with email"}
                onClick={() => setMode(mode === "email" ? "phone" : "email")}
              />
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="underline font-medium text-foreground">Terms of Service</a> and acknowledge our{" "}
              <a href="#" className="underline font-medium text-foreground">Privacy Policy</a>. This is a demo — no real account is created.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 rounded-lg border border-foreground/80 px-4 flex items-center relative hover:bg-secondary transition"
    >
      <span className="absolute left-4">{icon}</span>
      <span className="flex-1 text-center text-sm font-medium">{label}</span>
    </button>
  );
}
