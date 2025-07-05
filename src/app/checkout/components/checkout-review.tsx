import type { PaymentInfo, ShippingInfo } from "@/types/checkout";
import React from "react";
import CheckoutNavigation from "./checkout-navigation";
import { useCheckoutStore } from "@/store/checkout.store";

interface CheckoutReviewProps {
  handlePlaceOrder: () => Promise<void>;
}

const CheckoutReview: React.FC<CheckoutReviewProps> = ({
  handlePlaceOrder,
}) => {
  const {
    shippingInfo,
    paymentInfo,
    currentStep,
    isProcessing,
    nextStep,
    prevStep,
    shippingMethod,
  } = useCheckoutStore();
  if (!shippingInfo || !paymentInfo) {
    prevStep();
    return;
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-semibold">Shipping Address</h3>
        <div className="text-muted-foreground text-sm">
          <p>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>
          <p>{shippingInfo.address}</p>
          {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
          <p>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </p>
          <p>{shippingInfo.country}</p>
          <p>{shippingInfo.email}</p>
          <p>{shippingInfo.phone}</p>
        </div>
      </div>
      <div>
        {!paymentInfo.sameAsShipping && (
          <div className="mt-2">
            <h4 className="font-medium">Billing Address</h4>
            <div className="text-muted-foreground text-sm">
              <p>{paymentInfo.billingAddress}</p>
              <p>
                {paymentInfo.billingCity}, {paymentInfo.billingState}{" "}
                {paymentInfo.billingZipCode}
              </p>
              <p>{paymentInfo.billingCountry}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Shipping Method</h3>
        <div className="text-muted-foreground text-sm">
          <p>
            {shippingMethod === "standard"
              ? "Standard Shipping (5-7 business days)"
              : shippingMethod === "express"
                ? "Express Shipping (2-3 business days)"
                : "Overnight Shipping (Next business day)"}
          </p>
        </div>
      </div>
      <div>
        <CheckoutNavigation
          currentStep={currentStep}
          isProcessing={isProcessing}
          onPrevious={prevStep}
          onContinue={nextStep}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default CheckoutReview;
