export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber?: string;
  expiryDate?: string;
  cardholderName?: string;
  sameAsShipping: boolean;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZipCode?: string;
  billingCountry?: string;
}
