import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import Stripe from "stripe";
import { paymentSchema } from "@/app/checkout/components/checkout-payment-form";
import { shippingSchema } from "@/app/checkout/components/checkout-shipping-form";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const paymentRouter = createTRPCRouter({
  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { price } = input; // amount in cents
      const amount = Math.round(price * 100); // convert dollars to cents as integer

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      return { clientSecret: paymentIntent.client_secret };
    }),

  accomplishPayment: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            size: z.string(),
            color: z.string(),
            quantity: z.number(),
          }),
        ),
        shippingInfo: shippingSchema,
        paymentInfo: paymentSchema,
        shippingMethod: z.string(),
        total: z.number(),
        paymentIntentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        items,
        shippingInfo,
        paymentInfo,
        shippingMethod,
        total,
        paymentIntentId,
      } = input;

      // Create the purchase record
      const purchase = await ctx.db.purchase.create({
        data: {
          userId: ctx.session.user.id,
          total,
          shippingMethod,
          paymentIntentId,
          status: "completed",
          shippingAddress: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: shippingInfo.address,
            apartment: shippingInfo.apartment,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zipCode,
            country: shippingInfo.country,
          },
          billingAddress: paymentInfo.sameAsShipping
            ? {
                firstName: shippingInfo.firstName,
                lastName: shippingInfo.lastName,
                address: shippingInfo.address,
                apartment: shippingInfo.apartment,
                city: shippingInfo.city,
                state: shippingInfo.state,
                zipCode: shippingInfo.zipCode,
                country: shippingInfo.country,
              }
            : {
                firstName: paymentInfo.cardholderName,
                lastName: "",
                address: paymentInfo.billingAddress!,
                apartment: "",
                city: paymentInfo.billingCity!,
                state: paymentInfo.billingState!,
                zipCode: paymentInfo.billingZipCode!,
                country: paymentInfo.billingCountry!,
              },
          items: {
            create: items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return { purchaseId: purchase.id };
    }),
});
