import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Listing } from "@/data/mockListings";
import { useWishlist } from "@/context/WishlistContext";

export function PropertyCard({
  listing, showTotal, onOpen,
}: {
  listing: Listing;
  showTotal: boolean;
  onOpen: (l: Listing) => void;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const { has, toggle } = useWishlist();
  const liked = has(listing.id);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => { embla.off("select", onSelect); };
  }, [embla]);

  const nights = 5;
  const total = listing.price * nights;

  return (
    <div className="group cursor-pointer" onClick={() => onOpen(listing)}>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {listing.images.map((src, i) => (
              <div key={i} className="min-w-0 flex-[0_0_100%] h-full">
                <img
                  src={src}
                  alt={`${listing.title} ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {listing.isGuestFavourite && (
          <div className="absolute top-3 left-3 bg-background/95 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
            Guest favourite
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggle(listing.id); }}
          className="absolute top-3 right-3 transition-transform active:scale-90"
          aria-label="Save to wishlist"
        >
          <Heart
            className={cn(
              "h-7 w-7 stroke-white stroke-[2] drop-shadow-md transition-colors",
              liked ? "fill-primary" : "fill-black/40"
            )}
          />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); embla?.scrollPrev(); }}
          className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/95 shadow items-center justify-center hover:scale-105 transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); embla?.scrollNext(); }}
          className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/95 shadow items-center justify-center hover:scale-105 transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {listing.images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full bg-background transition-all",
                i === index ? "h-1.5 w-4 opacity-100" : "h-1.5 w-1.5 opacity-60"
              )}
            />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-start gap-2">
          <div className="font-semibold text-sm text-foreground truncate">{listing.location}</div>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground truncate">{listing.type}</div>
        <div className="text-sm text-muted-foreground">{listing.dates}</div>
        <div className="pt-1 text-sm">
          {listing.originalPrice ? (
            <>
              <span className="line-through text-muted-foreground mr-1">
                ₹{listing.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="font-semibold text-foreground">
                ₹{listing.price.toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <span className="font-semibold text-foreground">
              ₹{listing.price.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-foreground"> {showTotal ? `total · ₹${total.toLocaleString("en-IN")} before taxes` : "night"}</span>
        </div>
      </div>
    </div>
  );
}
