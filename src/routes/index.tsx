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
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [propertyType, setPropertyType] = useState("Any type");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActive("Trending");
  };

  const handleApplyFilters = (price: [number, number], type: string) => {
    setPriceRange(price);
    setPropertyType(type);
  };

  const filtered = useMemo(() => {
    let result = mockListings;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.location.toLowerCase().includes(q) ||
          l.title.toLowerCase().includes(q)
      );
    } else if (active !== "Trending") {
      const match = mockListings.filter((l) => l.category === active);
      result = match.length ? match : mockListings;
    }

    if (priceRange) {
      result = result.filter((l) => l.price >= priceRange[0] && l.price <= priceRange[1]);
    }

    if (propertyType === "Room") {
      result = result.filter((l) => l.type.toLowerCase().includes("room") || l.type.toLowerCase().includes("suite"));
    } else if (propertyType === "Entire home") {
      result = result.filter((l) => !l.type.toLowerCase().includes("room") && !l.type.toLowerCase().includes("suite"));
    }

    return result;
  }, [active, searchQuery, priceRange, propertyType]);

  const openListing = (l: Listing) => { setSelected(l); setOpen(true); };

  const heading = searchQuery.trim() !== "" ? `Stays in "${searchQuery}"` : `Popular homes in ${active}`;

  return (
    <WishlistProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar onSearch={handleSearch} />
        <CategoryBar
          active={active}
          onChange={(c) => { setActive(c); setSearchQuery(""); }}
          showTotal={showTotal}
          onToggleTotal={setShowTotal}
          onApplyFilters={handleApplyFilters}
        />
        <main className="flex-1 mx-auto max-w-[1760px] w-full px-4 md:px-10 py-6">
          <div className="mb-4">
            <h1 className="text-xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "stay" : "stays"} found
            </p>
          </div>
          {!loading && filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No stays found. Try a different search or filter.
            </div>
          ) : (
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
          )}
        </main>
        <Footer />
        <ListingDetailModal listing={selected} open={open} onOpenChange={setOpen} />
      </div>
    </WishlistProvider>
  );
}