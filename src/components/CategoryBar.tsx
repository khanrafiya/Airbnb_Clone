import { useRef, useState, useEffect } from "react";
import {
  Flame, Waves, Palmtree, TreePine, Trees, Sparkles, Home, Castle,
  Sailboat, Building2, Mountain, Sun, ChevronLeft, ChevronRight, SlidersHorizontal,
} from "lucide-react";
import { categories } from "@/data/mockListings";
import { Switch } from "@/components/ui/switch";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  Trending: Flame, "Amazing pools": Waves, Beachfront: Palmtree, Cabins: TreePine,
  Countryside: Trees, Design: Sparkles, "Tiny homes": Home, Castles: Castle,
  Lakefront: Sailboat, Mansions: Building2, "Amazing views": Mountain, Tropical: Sun,
};

export function CategoryBar({
  active, onChange, showTotal, onToggleTotal, onApplyFilters,
}: {
  active: string;
  onChange: (c: string) => void;
  showTotal: boolean;
  onToggleTotal: (v: boolean) => void;
  onApplyFilters?: (price: [number, number], type: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => { update(); }, []);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[73px] md:top-[89px] z-30 bg-background border-b border-border">
      <div className="mx-auto max-w-[1760px] px-4 md:px-10">
        <div className="flex items-center gap-4 py-3">
          <div className="relative flex-1 group">
            {canLeft && (
              <button
                onClick={() => scroll(-1)}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full border border-border bg-background shadow-md items-center justify-center hover:scale-105 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div
              ref={scrollRef}
              onScroll={update}
              className="flex items-end gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x"
            >
              {categories.map((c) => {
                const Icon = iconMap[c] ?? Flame;
                const isActive = c === active;
                return (
                  <button
                    key={c}
                    onClick={() => onChange(c)}
                    className={cn(
                      "flex flex-col items-center gap-2 pb-3 pt-1 min-w-fit snap-start border-b-2 transition-colors duration-200",
                      isActive
                        ? "border-foreground text-foreground opacity-100"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                    <span className="text-xs font-medium whitespace-nowrap">{c}</span>
                  </button>
                );
              })}
            </div>
            {canRight && (
              <button
                onClick={() => scroll(1)}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full border border-border bg-background shadow-md items-center justify-center hover:scale-105 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div className="h-8 w-px bg-border" />
            <FiltersSheet onApply={onApplyFilters} />
            <label className="flex items-center gap-3 border border-border rounded-xl px-3 py-2 hover:shadow-sm transition cursor-pointer">
              <span className="text-xs font-medium">Display total before taxes</span>
              <Switch checked={showTotal} onCheckedChange={onToggleTotal} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function FiltersSheet({ onApply }: { onApply?: (price: [number, number], type: string) => void }) {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState<[number, number]>([500, 25000]);
  const [type, setType] = useState("Any type");
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const amenities = ["Wi-Fi", "Kitchen", "Washer", "Air conditioning", "Pool", "Hot tub", "Free parking", "Breakfast"];

  const handleShowHomes = () => {
    onApply?.(price, type);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 border border-foreground/80 text-foreground bg-background rounded-xl px-3 py-2 text-xs font-semibold hover:shadow-md transition">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-8 py-6 px-4">
          <section>
            <h3 className="font-semibold mb-3">Price range</h3>
            <Slider min={500} max={50000} step={500} value={price} onValueChange={(v) => setPrice(v as [number, number])} />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>₹{price[0].toLocaleString("en-IN")}</span>
              <span>₹{price[1].toLocaleString("en-IN")}</span>
            </div>
          </section>
          <section>
            <h3 className="font-semibold mb-3">Type of place</h3>
            <RadioGroup value={type} onValueChange={setType} className="gap-3">
              {["Any type", "Room", "Entire home"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <RadioGroupItem value={t} id={t} />
                  <Label htmlFor={t}>{t}</Label>
                </div>
              ))}
            </RadioGroup>
          </section>
          <section>
            <h3 className="font-semibold mb-3">Rooms and beds</h3>
            {[
              { label: "Bedrooms", value: bedrooms, setValue: setBedrooms },
              { label: "Beds", value: beds, setValue: setBeds },
              { label: "Bathrooms", value: bathrooms, setValue: setBathrooms },
            ].map(({ label, value, setValue }) => (
              <div key={label} className="flex justify-between items-center py-2">
                <span className="text-sm">{label}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setValue(Math.max(0, value - 1))}
                    disabled={value === 0}
                    className="h-7 w-7 rounded-full border flex items-center justify-center hover:border-foreground disabled:opacity-40 transition"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm">{value === 0 ? "Any" : value}</span>
                  <button
                    onClick={() => setValue(value + 1)}
                    className="h-7 w-7 rounded-full border flex items-center justify-center hover:border-foreground transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </section>
          <section>
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm">
                  <Checkbox /> {a}
                </label>
              ))}
            </div>
          </section>
        </div>
        <SheetFooter>
          <Button
            onClick={handleShowHomes}
            className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Show homes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}