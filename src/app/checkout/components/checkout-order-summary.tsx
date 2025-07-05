import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { MapPin, Shield, Truck } from "lucide-react";
import React from "react";

const CheckoutOrderSummary = ({
  shippingMethod,
}: {
  shippingMethod: string;
}) => {
  const { items: cartItems } = useCartStore();
  const subtotal = cartItems.reduce((a, c) => a + c.price, 0);

  const shippingCost =
    shippingMethod === "express"
      ? 15.99
      : shippingMethod === "overnight"
        ? 29.99
        : 5.99;
  const total = subtotal + shippingCost;
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="text-muted-foreground mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free returns within 30 days</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Track your order</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutOrderSummary;
