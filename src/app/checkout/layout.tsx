"use client";
import { stripePromise } from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import React, { type ReactNode } from "react";

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default CheckoutLayout;
