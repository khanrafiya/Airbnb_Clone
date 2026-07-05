import { useState } from "react";
import { Star, MapPin, Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import type { Listing } from "@/data/mockListings";

export function ListingDetailModal({
  listing, open, onOpenChange,
}: {
  listing: Listing | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);

  if (!listing) return null;

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const total = nights * listing.price;

  const canReserve = checkIn && checkOut && nights > 0;

  const handleReserve = () => {
    if (!canReserve) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    toast.success(
      `Reserved! ${nights} night${nights > 1 ? "s" : ""} · ₹${total.toLocaleString("en-IN")} total`,
      { duration: 3000 }
    );
    onOpenChange(false);
  };

  const formatDate = (d?: Date) =>
    d ? d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Add date";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{listing.title}</DialogTitle>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-1">
              <div className="flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 fill-current" /> {listing.rating.toFixed(2)}
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {listing.location}
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-4 gap-2 mt-4 rounded-xl overflow-hidden">
            <img src={listing.images[0]} alt="" className="col-span-2 row-span-2 aspect-square object-cover w-full h-full" />
            {listing.images.slice(1, 5).map((src, i) => (
              <img key={i} src={src} alt="" className="aspect-square object-cover w-full h-full" />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{listing.type}</h3>
                <p className="text-muted-foreground mt-2">{listing.description}</p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-3">What this place offers</h3>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((a) => (
                    <div key={a} className="text-sm py-2">{a}</div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-3">Hosted by {listing.host.name}</h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {listing.host.name[0]}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{listing.host.superhost ? "Superhost" : "Host"}</div>
                    <div className="text-muted-foreground">{listing.host.years} years hosting</div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="border border-border rounded-xl p-5 shadow-md h-fit sticky top-4">
              <div className="text-xl">
                <span className="font-semibold">₹{listing.price.toLocaleString("en-IN")}</span>
                <span className="text-muted-foreground text-base"> night</span>
              </div>
              <div className="border border-border rounded-xl mt-4 divide-y divide-border">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 text-left hover:bg-secondary transition">
                        <div className="text-[10px] font-bold">CHECK-IN</div>
                        <div className="text-sm text-muted-foreground">{formatDate(checkIn)}</div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-3 text-left hover:bg-secondary transition">
                        <div className="text-[10px] font-bold">CHECKOUT</div>
                        <div className="text-sm text-muted-foreground">{formatDate(checkOut)}</div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold">GUESTS</div>
                    <div className="text-sm text-muted-foreground">{guests} guest{guests > 1 ? "s" : ""}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="h-7 w-7 rounded-full border flex items-center justify-center hover:border-foreground transition"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setGuests((g) => Math.min(16, g + 1))}
                      className="h-7 w-7 rounded-full border flex items-center justify-center hover:border-foreground transition"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {nights > 0 && (
                <div className="mt-4 text-sm space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>₹{listing.price.toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-border pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleReserve}
                className="w-full mt-4 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground h-12 text-base font-semibold"
              >
                Reserve
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2">You won't be charged yet</p>
            </aside>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}