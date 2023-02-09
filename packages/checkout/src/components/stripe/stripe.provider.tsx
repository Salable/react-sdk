import React, { FC, useEffect, useState, useCallback, Fragment } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { SALABLE_API } from '../../constants/constants';
import { useInHouseCheckout } from '../../context/use-checkout';
import FormFieldError from '../skeleton/error.skeleton';
import CheckoutForm from './checkout-form';
import { FrameError } from '../../util/message-error';
import './checkout-form.css';

const previewClient =
  'pi_3MYVXrChnZeGQTI01UrTGTbU_secret_Hx3aztX7ULt4xqNF4bZAtrjpy';

export interface IStripeProvider {
  planID: string;
  stripePubKey: string;
}

export const StripeProvider: FC<IStripeProvider> = ({
  stripePubKey,
  planID,
}) => {
  const { preview } = useInHouseCheckout();
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState(
    preview ? previewClient : ''
  );

  useEffect(() => {
    if (preview) return;
    if (!SALABLE_API) throw new FrameError('Missing API Domain', 'developer');
    void (async () => {
      try {
        const res = await fetch(`${SALABLE_API}/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: planID }] }),
        });
        const data = (await res.json()) as { clientSecret: string };
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage(
          'Failed to initialize Payment Provider. Please try again'
        );
      }
    })();
  }, []);

  const stripePromise = useCallback(() => loadStripe(stripePubKey), []);
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  if (errorMessage) {
    return <FormFieldError message={errorMessage} />;
  }

  return (
    <Fragment>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise()}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </Fragment>
  );
};
