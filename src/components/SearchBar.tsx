import { useState } from "react";
import { Search, Minus, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestions = [
  { name: "Goa", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=60" },
  { name: "Manali", img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=200&q=60" },
  { name: "Udaipur", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=60" },
  { name: "Bali", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=200&q=60" },
  { name: "Lisbon", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=200&q=60" },
  { name: "Kyoto", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=60" },
];

function Counter({ label, sub, value, onChange }: { label: string; sub: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div>
        <div className="font-semibold text-foreground">{label}</div>
        <div className="text-sm text-muted-foreground">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-8 w-8 rounded-full border border-border flex items-center justify-center disabled:opacity-40 hover:border-foreground transition"
          disabled={value === 0}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:border-foreground transition"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SearchBar({ compact, onSearch }: { compact?: boolean; onSearch?: (query: string) => void }) {
  const [open, setOpen] = useState(false);
  const [where, setWhere] = useState("");
  const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const handleSearch = (query: string) => {
    onSearch?.(query);
    setOpen(false);
  };

  if (compact) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-3 w-full rounded-full border border-border shadow-sm px-4 py-3 bg-background hover:shadow-md transition">
            <Search className="h-4 w-4" />
            <div className="text-left flex-1">
              <div className="text-sm font-semibold">Start your search</div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-[92vw] p-4">
          <SearchPanels
            where={where} setWhere={setWhere}
            range={range} setRange={setRange}
            adults={adults} setAdults={setAdults}
            children={children} setChildren={setChildren}
            infants={infants} setInfants={setInfants}
            pets={pets} setPets={setPets}
            onSearch={handleSearch}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center rounded-full border border-border shadow-sm hover:shadow-md transition bg-background",
            "divide-x divide-border"
          )}
        >
          <span className="px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-secondary transition">
            {where ? where : "Anywhere"}
          </span>
          <span className="px-6 py-2.5 text-sm font-semibold hover:bg-secondary transition">Any week</span>
          <span className="pl-6 pr-2 py-2 text-sm font-normal text-muted-foreground flex items-center gap-2 rounded-full hover:bg-secondary transition">
            Add guests
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleSearch(where);
              }}
              className="h-8 w-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground flex items-center justify-center transition cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[720px] max-w-[92vw] p-4">
        <SearchPanels
          where={where} setWhere={setWhere}
          range={range} setRange={setRange}
          adults={adults} setAdults={setAdults}
          children={children} setChildren={setChildren}
          infants={infants} setInfants={setInfants}
          pets={pets} setPets={setPets}
          onSearch={handleSearch}
        />
      </PopoverContent>
    </Popover>
  );
}

function SearchPanels(props: any) {
  const { where, setWhere, range, setRange, adults, setAdults, children, setChildren, infants, setInfants, pets, setPets, onSearch } = props;
  return (
    <Tabs defaultValue="where" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="where">Where</TabsTrigger>
        <TabsTrigger value="when">Check in / Check out</TabsTrigger>
        <TabsTrigger value="who">Who</TabsTrigger>
      </TabsList>
      <TabsContent value="where" className="pt-4">
        <Input
          placeholder="Search destinations"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.(where);
          }}
          className="rounded-full h-11 px-5"
        />
        <div className="mt-4 text-sm font-semibold text-foreground">Suggested destinations</div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {suggestions.map((s) => (
            <button
              key={s.name}
              onClick={() => {
                setWhere(s.name);
                onSearch?.(s.name);
              }}
              className="flex items-center gap-3 rounded-xl border border-border p-2 hover:bg-secondary transition text-left"
            >
              <img src={s.img} alt={s.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="text-sm font-medium">{s.name}</div>
            </button>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="when" className="pt-4 flex justify-center">
        <Calendar
          mode="range"
          selected={range as any}
          onSelect={setRange as any}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
      </TabsContent>
      <TabsContent value="who" className="pt-2">
        <Counter label="Adults" sub="Ages 13 or above" value={adults} onChange={setAdults} />
        <Counter label="Children" sub="Ages 2–12" value={children} onChange={setChildren} />
        <Counter label="Infants" sub="Under 2" value={infants} onChange={setInfants} />
        <Counter label="Pets" sub="Bringing a service animal?" value={pets} onChange={setPets} />
      </TabsContent>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => onSearch?.(where)}
          className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
    </Tabs>
  );
}