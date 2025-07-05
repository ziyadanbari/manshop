import { create } from "zustand";
import type { ShippingInfo, PaymentInfo } from "@/types/checkout";

interface CheckoutStore {
  currentStep: number;
  isProcessing: boolean;
  shippingInfo: ShippingInfo | null;
  paymentInfo: PaymentInfo | null;
  shippingMethod: string;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setProcessing: (processing: boolean) => void;
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setShippingMethod: (method: string) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  currentStep: 1,
  isProcessing: false,
  shippingInfo: null,
  paymentInfo: null,
  shippingMethod: "standard",
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(3, state.currentStep + 1) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  setStep: (step) => set({ currentStep: step }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setShippingInfo: (info) => set({ shippingInfo: info }),
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  setShippingMethod: (method) => set({ shippingMethod: method }),
}));
