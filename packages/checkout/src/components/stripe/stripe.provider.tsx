import React, { FC, useState, useCallback, Fragment } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { SALABLE_API } from '../../constants/constants';
import { useInHouseCheckout } from '../../context/use-checkout';
import CheckoutForm from './checkout-form';
import { FrameError } from '../../util/message-error';
import styles from './stripe-form.module.css';
import './checkout-form.css';
import { ErrorMessage, InputEmail } from '../input-email';

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
  const {
    preview,
    state: { params, styles: customStyles },
  } = useInHouseCheckout();
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState(
    preview ? previewClient : ''
  );
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [creatingIntent, setCreatingIntent] = useState(false);

  const createSubscriptionIntent = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // if (preview) return;
    if (!SALABLE_API) throw new FrameError('Missing API Domain', 'developer');
    const emailValid = RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    ).test(userEmail);
    // Validate email address
    if (!userEmail || !emailValid) {
      setEmailError(`Invalid email address: ${userEmail}`);
      return;
    }
    // Create client secrete for stripe form
    setCreatingIntent(true);
    void (async () => {
      if (!params.api_key) throw new FrameError('Missing API Key', 'developer');
      try {
        const res = await fetch(`${SALABLE_API}/subscription-intents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': params.api_key,
          },
          body: JSON.stringify({
            planUuid: planID,
            email: userEmail,
            member: params.grantee_id,
            granteeId: params.member_id,
          }),
        });
        const data = (await res.json()) as { clientSecret: string };
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage('Failed to create payment intent. Please try again');
      }
      setCreatingIntent(false);
    })();
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const stripePromise = useCallback(() => loadStripe(stripePubKey), []);
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        fontFamily: customStyles?.fontFamily,
        borderRadius: customStyles?.borderRadius,
        spacingUnit: customStyles?.spacingUnit,
        colorPrimary: customStyles?.primaryColor,
      },
    },
  };

  if (clientSecret) {
    return (
      <Fragment>
        <Elements options={options} stripe={stripePromise()}>
          <CheckoutForm email={userEmail} clientSecret={clientSecret} />
        </Elements>
      </Fragment>
    );
  }
  return (
    <form onSubmit={createSubscriptionIntent}>
      <InputEmail
        className={styles['mb-24']}
        onChange={onEmailChange}
        errorMessage={emailError}
      />
      <button
        disabled={creatingIntent}
        id="submit"
        type="submit"
        style={{
          borderRadius: customStyles?.borderRadius,
          padding: customStyles?.spacingUnit3,
          backgroundColor: customStyles?.primaryColor,
        }}
      >
        <span id="button-text">
          {creatingIntent ? (
            <div className="spinner" id="spinner" />
          ) : (
            'Continue'
          )}
        </span>
      </button>
      <ErrorMessage message={errorMessage} />
    </form>
  );
};
