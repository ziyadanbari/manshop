import React, { useMemo } from "react";
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
import CheckoutNavigation from "./checkout-navigation";
import { useCheckoutStore } from "@/store/checkout.store";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Email is invalid"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

interface CheckoutShippingFormProps {
  onSubmit?: (values: ShippingFormValues) => void;
}

const defaultValues: ShippingFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
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

const CheckoutShippingForm: React.FC<CheckoutShippingFormProps> = ({
  onSubmit,
}) => {
  const {
    currentStep,
    isProcessing,
    prevStep,
    shippingMethod,
    setShippingMethod,
    shippingInfo,
  } = useCheckoutStore();
  const formDefaultValues = useMemo(
    () => shippingInfo || defaultValues,
    [shippingInfo],
  );
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: formDefaultValues,
  });
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log("submitting");
          if (onSubmit) onSubmit(values);
        })}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
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
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
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
            name="zipCode"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
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
        <div className="w-full">
          <Separator className="my-6" />
          <div>
            <Label className="mb-4 block text-base font-semibold">
              Shipping Method
            </Label>
            <RadioGroup
              value={shippingMethod}
              onValueChange={setShippingMethod}
            >
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        5-7 business days
                      </p>
                    </div>
                    <span className="font-semibold">$5.99</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1 cursor-pointer">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        2-3 business days
                      </p>
                    </div>
                    <span className="font-semibold">$15.99</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="overnight" id="overnight" />
                <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="font-medium">Overnight Shipping</p>
                      <p className="text-muted-foreground text-sm">
                        Next business day
                      </p>
                    </div>
                    <span className="font-semibold">$29.99</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <CheckoutNavigation
            currentStep={currentStep}
            isProcessing={isProcessing}
            onPrevious={prevStep}
            onContinue={() => {}}
            onPlaceOrder={() => {}}
          />
        </div>
      </form>
    </Form>
  );
};

export default CheckoutShippingForm;
