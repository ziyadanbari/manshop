import React, { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CheckoutNavigation from "./checkout-navigation";
import { useCheckoutStore } from "@/store/checkout.store";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

export const paymentSchema = z
  .object({
    cardNumber: z.string().min(16, "Card number is invalid").optional(),
    expiryDate: z.string().min(5, "Expiry date is required").optional(),
    cvc: z.string().min(3, "CVV is invalid").optional(),
    cardholderName: z.string().min(1, "Cardholder name is required"),
    sameAsShipping: z.boolean(),
    billingAddress: z.string().optional(),
    billingCity: z.string().optional(),
    billingState: z.string().optional(),
    billingZipCode: z.string().optional(),
    billingCountry: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.sameAsShipping) {
        return (
          !!data.billingAddress &&
          !!data.billingCity &&
          !!data.billingState &&
          !!data.billingZipCode &&
          !!data.billingCountry
        );
      }
      return true;
    },
    {
      message: "Billing address is required",
      path: ["billingAddress"],
    },
  );

export type PaymentFormValues = z.infer<typeof paymentSchema>;

interface CheckoutPaymentFormProps {
  onSubmit?: (values: PaymentFormValues) => void;
}

const defaultValues: PaymentFormValues = {
  cardholderName: "",
  sameAsShipping: true,
  billingAddress: "",
  billingCity: "",
  billingState: "",
  billingZipCode: "",
  billingCountry: "US",
};

const states = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
];

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
];

const CheckoutPaymentForm: React.FC<CheckoutPaymentFormProps> = ({
  onSubmit,
}) => {
  const [cardNumber, setCardNumber] = useState(false);
  const [cvc, setCVC] = useState(false);
  const [expiry, setExpiry] = useState(false);

  const { currentStep, isProcessing, prevStep, paymentInfo } =
    useCheckoutStore();
  const formDefaultValues = useMemo(
    () => paymentInfo || defaultValues,
    [paymentInfo],
  );
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: formDefaultValues,
  });

  const sameAsShipping = form.watch("sameAsShipping");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          if (!cardNumber)
            return form.setError("cardNumber", {
              message: "Card number is invalid",
            });
          if (!expiry)
            return form.setError("expiryDate", {
              message: "Expiration date is invalid",
            });
          if (!cvc)
            return form.setError("cvc", { message: "Cvc number is invalid" });
          if (onSubmit) onSubmit(values);
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number *</FormLabel>
              <FormControl>
                <CardNumberElement
                  className="border-input rounded-md border p-2"
                  onChange={(e) => setCardNumber(e.complete)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date *</FormLabel>
                <FormControl>
                  <CardExpiryElement
                    className="border-input rounded-md border p-2"
                    onChange={(e) => setExpiry(e.complete)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC *</FormLabel>
                <FormControl>
                  <CardCvcElement
                    className="border-input rounded-md border p-2"
                    onChange={(e) => setCVC(e.complete)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sameAsShipping"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="sameAsShipping"
                  />
                </FormControl>
                <FormLabel htmlFor="sameAsShipping">
                  Billing address same as shipping
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {!sameAsShipping && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="billingAddress"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Billing Address *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <CheckoutNavigation
          currentStep={currentStep}
          isProcessing={isProcessing}
          onPrevious={prevStep}
          onContinue={() => {}}
          onPlaceOrder={() => {}}
        />
      </form>
    </Form>
  );
};

export default CheckoutPaymentForm;
