import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CategoryBar } from "@/components/CategoryBar";
import { PropertyCard } from "@/components/PropertyCard";
import { ListingDetailModal } from "@/components/ListingDetailModal";
import { Footer } from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { mockListings, type Listing } from "@/data/mockListings";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [active, setActive] = useState<string>("Trending");
  const [showTotal, setShowTotal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Listing | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (active === "Trending") return mockListings;
    const match = mockListings.filter((l) => l.category === active);
    return match.length ? match : mockListings;
  }, [active]);

  const openListing = (l: Listing) => { setSelected(l); setOpen(true); };

  return (
    <WishlistProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <CategoryBar
          active={active}
          onChange={setActive}
          showTotal={showTotal}
          onToggleTotal={setShowTotal}
        />
        <main className="flex-1 mx-auto max-w-[1760px] w-full px-4 md:px-10 py-6">
          <div className="mb-4">
            <h1 className="text-xl font-semibold">Popular homes in {active}</h1>
            <p className="text-sm text-muted-foreground">Handpicked stays travellers are loving right now</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
            {loading
              ? Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))
              : filtered.map((l) => (
                  <PropertyCard key={l.id} listing={l} showTotal={showTotal} onOpen={openListing} />
                ))}
          </div>
        </main>
        <Footer />
        <ListingDetailModal listing={selected} open={open} onOpenChange={setOpen} />
      </div>
    </WishlistProvider>
  );
}
