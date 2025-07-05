import React from "react";
import { Button } from "@/components/ui/button";

interface CheckoutNavigationProps {
  currentStep: number;
  isProcessing?: boolean;
  onPrevious: () => void;
  onContinue: () => void;
  onPlaceOrder: () => void;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  currentStep,
  isProcessing,
  onPrevious,
  onContinue,
  onPlaceOrder,
}) => {
  return (
    <div className="mt-6 flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        Previous
      </Button>
      {currentStep < 3 ? (
        <Button type="submit" onClick={onContinue}>
          Continue
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={onPlaceOrder}
          disabled={isProcessing}
          size="lg"
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>
      )}
    </div>
  );
};

export default CheckoutNavigation;
