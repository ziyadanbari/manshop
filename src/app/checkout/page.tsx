"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutCartItems from "./components/checkout-cart-items";
import CheckoutShippingForm from "./components/checkout-shipping-form";
import CheckoutPaymentForm from "./components/checkout-payment-form";
import CheckoutReview from "./components/checkout-review";
import CheckoutOrderSummary from "./components/checkout-order-summary";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout.store";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutPage() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const {
    currentStep,
    shippingInfo,
    paymentInfo,
    shippingMethod,
    setShippingInfo,
    setPaymentInfo,
    nextStep,
    setProcessing,
  } = useCheckoutStore();
  // Cart state from store
  const cartItems = useCartStore((state) => state.items);
  const { mutateAsync } = api.payment.createPaymentIntent.useMutation();
  const { mutateAsync: accomplishPayment } =
    api.payment.accomplishPayment.useMutation();
  const handlePlaceOrder = async () => {
    try {
      setProcessing(true);
      const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
      if (!stripe || !elements)
        throw new Error(
          "Something went wrong! We cannot process your payment now.",
        );

      const shippingCost =
        shippingMethod === "express"
          ? 15.99
          : shippingMethod === "overnight"
            ? 29.99
            : 5.99;
      const total = subtotal + shippingCost;
      const { clientSecret } = await mutateAsync({
        price: total,
      });
      if (!clientSecret)
        throw new Error(
          "Something went wrong! We cannot process your payment now.",
        );
      console.log(elements.getElement(CardNumberElement));
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      });
      console.log(result);
      if (result.error) throw new Error(result.error.message);

      // Save the purchase to database
      await accomplishPayment({
        items: cartItems,
        shippingInfo: shippingInfo!,
        paymentInfo: paymentInfo!,
        shippingMethod,
        total,
        paymentIntentId: result.paymentIntent!.id,
      });

      toast.success("Order placed successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some items to your cart to proceed with checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="p-2"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Back to Shopping
            </Button>
            <h1 className="text-xl font-bold">Checkout</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Shipping", icon: Truck },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Review", icon: Shield },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
                {step < 3 && <div className="bg-muted mx-4 h-px w-16" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <CheckoutCartItems />

            {/* Step Content */}
            {currentStep === 1 && (
              <CheckoutShippingForm
                onSubmit={(values) => {
                  setShippingInfo(values);
                  nextStep();
                }}
              />
            )}
            <div
              style={{
                display: currentStep === 2 ? "block" : "none",
              }}
            >
              <CheckoutPaymentForm
                onSubmit={(values) => {
                  setPaymentInfo(values);
                  nextStep();
                }}
              />
            </div>
            {currentStep === 3 && shippingInfo && paymentInfo && (
              <CheckoutReview handlePlaceOrder={handlePlaceOrder} />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <CheckoutOrderSummary shippingMethod={shippingMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}
