import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { FC } from 'react';
import CheckoutForm from './checkout-form';

export interface IStripeProvider {
  productId: string;
  stripePubKey: string;
}

export const StripeProvider: FC<IStripeProvider> = ({ stripePubKey }) => {
  const stripePromise = loadStripe(stripePubKey);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
