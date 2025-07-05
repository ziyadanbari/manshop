import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CheckoutCartItems: React.FC = () => {
  const { items: cartItems, updateQuantity, removeItem } = useCartStore();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>
              Order Items (
              {cartItems.reduce((total, item) => total + item.quantity, 0)})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-muted-foreground text-sm line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity + 1,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive ml-2 h-8 w-8"
                    onClick={() => removeItem(item.id, item.size, item.color)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutCartItems;
