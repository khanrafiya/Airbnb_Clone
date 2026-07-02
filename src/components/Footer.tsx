import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

const cols = [
  { title: "Support", links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighbourhood concern"] },
  { title: "Hosting", links: ["List your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly", "Join a class"] },
  { title: "Airbnb", links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Emergency stays"] },
];

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-12">
      <div className="mx-auto max-w-[1760px] px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-semibold text-sm mb-4">{c.title}</h3>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-foreground">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 font-semibold hover:underline">
              <Globe className="h-4 w-4" /> English (IN)
            </button>
            <button className="font-semibold hover:underline">₹ INR</button>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
