import { Globe, Menu, CircleUser } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SearchBar } from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-1 text-primary shrink-0">
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden>
<path d="M16 0c1.1 0 2 .5 2.8 1.4.7.8 1.4 2 2.2 3.6.7 1.4 1.5 3.1 2.5 5.1.9 1.9 1.9 4 2.7 6.1.4 1 .8 2.1 1 3.1.3 1.1.4 2.1.4 3 0 3.4-1.3 6.1-3.5 7.9-1.8 1.5-4.2 2.3-6.9 2.4h-.4c-2.7-.1-5.1-.9-6.9-2.4-2.2-1.8-3.5-4.5-3.5-7.9 0-.9.1-1.9.4-3 .2-1 .6-2.1 1-3.1.8-2.1 1.8-4.2 2.7-6.1 1-2 1.8-3.7 2.5-5.1.8-1.6 1.5-2.8 2.2-3.6C14 .5 14.9 0 16 0zm0 3c-.2 0-.6.2-1.1.9-.6.7-1.2 1.8-2 3.3-.7 1.4-1.5 3-2.4 4.9-.9 1.9-1.8 3.9-2.6 5.9-.4.9-.7 1.9-.9 2.7-.2.8-.3 1.5-.3 2.1 0 2.3.8 4.1 2.3 5.4 1.3 1.1 3.1 1.7 5.3 1.8h.4c2.2-.1 4-.7 5.3-1.8 1.5-1.3 2.3-3.1 2.3-5.4 0-.6-.1-1.3-.3-2.1-.2-.8-.5-1.8-.9-2.7-.8-2-1.7-4-2.6-5.9-.9-1.9-1.7-3.5-2.4-4.9-.8-1.5-1.4-2.6-2-3.3C16.6 3.2 16.2 3 16 3zm0 6c1 1.5 1.9 3 2.6 4.4.6 1.3 1.1 2.5 1.1 3.5 0 2-1.6 3.6-3.7 3.7-2.1-.1-3.7-1.7-3.7-3.7 0-1 .5-2.2 1.1-3.5.7-1.4 1.6-2.9 2.6-4.4z" />      </svg>
      <span className="text-2xl font-bold tracking-tight hidden sm:inline">airbnb</span>
    </a>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="mx-auto max-w-[1760px] px-4 md:px-10 py-3 md:py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Logo />
          <div className="hidden md:flex justify-center">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center gap-2 justify-end">
            <a href="#" className="text-sm font-semibold px-3 py-2 rounded-full hover:bg-secondary transition">
              Airbnb your home
            </a>
            <button className="h-10 w-10 rounded-full hover:bg-secondary flex items-center justify-center transition">
              <Globe className="h-4 w-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 border border-border rounded-full pl-3 pr-1 py-1 hover:shadow-md transition">
                  <Menu className="h-4 w-4" />
                  <CircleUser className="h-8 w-8 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild className="font-semibold">
                  <Link to="/login">Sign up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Gift cards</DropdownMenuItem>
                <DropdownMenuItem>Help Centre</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden col-span-2 mt-1">
            <SearchBar compact />
          </div>
        </div>
      </div>
    </header>
  );
}
