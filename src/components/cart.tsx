"use client";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);
  const getItemsCount = useCartStore((state) => state.getItemsCount);

  const cartTotal = getTotal();
  const cartItemsCount = getItemsCount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-transparent"
        >
          <ShoppingCart className="h-4 w-4" />
          {cartItemsCount > 0 && (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartItemsCount})</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className="flex items-center space-x-4 rounded-lg border p-4"
                  >
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive h-8 w-8"
                        onClick={() =>
                          removeItem(item.id, item.size, item.color)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <SheetFooter>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      Total: ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <Link href={"/checkout"}>
                    <Button className="w-full" size="lg">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
