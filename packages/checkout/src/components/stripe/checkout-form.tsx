import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

import styles from './stripe-form.module.css';
import { useInHouseCheckout } from '../../context/use-checkout';
import { ErrorMessage } from '../input-email';

const CheckoutForm = ({
  email,
  clientSecret,
}: {
  email: string;
  clientSecret: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {
    state: { preview, params, styles: customStyles },
  } = useInHouseCheckout();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessage('');
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      })
      .catch(() => {
        setMessage('Something went wrong.');
      });
  }, [stripe]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (preview) return;
    void (async () => {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              email,
            },
          },
          // Make sure to change this to your payment completion page
          return_url: params.success_url || window.location.origin,
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error?.message || undefined);
      } else {
        setMessage('An unexpected error occurred.');
      }

      setIsLoading(false);
    })();
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        className={styles['mb-24']}
        options={paymentElementOptions}
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        style={{
          borderRadius: customStyles?.borderRadius,
          padding: customStyles?.spacingUnit3,
          backgroundColor: customStyles?.primaryColor,
        }}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {!preview ? <ErrorMessage message={message} /> : null}
    </form>
  );
};

export default CheckoutForm;
