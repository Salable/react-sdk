import React, { FC, Fragment } from 'react';
import { useInHouseCheckout } from '../context/use-checkout';
import { FrameError } from '../util/message-error';
import { ModalComponent } from './modal/modal';
import { PaddleCheckoutProvider } from './paddle/paddle.provider';
import { PriceDetails } from './pricing/price-details';
import FormFieldError from './skeleton/error.skeleton';
import { IntegrationWrapper } from './skeleton/integration-wrapper';
import FormFieldSkeleton from './skeleton/loading.skeleton';
import { StripeProvider } from './stripe/stripe.provider';

interface IIntegrationProvider {
  children?: React.ReactNode;
}

const paddleComponentId = 'paddle-wrapper';
const SelectIntegration: FC<IIntegrationProvider> = ({ children }) => {
  const {
    state: { integration_type, paddle, stripe, plan },
  } = useInHouseCheckout();
  const stripePubKey = stripe?.publishableKey;
  if (integration_type === 'stripe') {
    if (!stripePubKey) {
      throw new FrameError(
        "Payment integration can't be initialized",
        'developer',
        'Missing stripe publishable key'
      );
    }
    if (!plan?.uuid) {
      throw new FrameError(
        "Payment integration can't be initialized",
        'developer',
        'Missing Plan UUID'
      );
    }
    return (
      <Fragment>
        <PriceDetails />
        <StripeProvider planID={plan?.uuid} stripePubKey={stripePubKey} />
        {children}
      </Fragment>
    );
  }
  if (integration_type === 'paddle') {
    if (!paddle?.vendorID) {
      throw new FrameError(
        "Payment integration can't be initialized",
        'developer',
        'Missing vendor ID'
      );
    }
    return (
      <Fragment>
        <PriceDetails />
        <PaddleCheckoutProvider
          environmentConfig={{
            vendor: paddle?.vendorID,
            environment: paddle?.environment,
            eventCallback: (data) => {
              switch (data.event) {
                case 'Checkout.Complete':
                  break;
                case 'Checkout.Close':
                  break;
              }
            },
          }}
          checkoutConfig={{
            frameInitialHeight: 416,
            frameStyle:
              'width:100%; min-width:376px; background-color: transparent; border: none;',
          }}
          productId={plan?.uuid}
          targetComponent={paddleComponentId}
        >
          <Fragment>
            <div className={paddleComponentId} />
            {children}
          </Fragment>
        </PaddleCheckoutProvider>
      </Fragment>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export const IntegrationProvider: FC<IIntegrationProvider> = ({ children }) => {
  const {
    renderType,
    closeCheckoutModal,
    state: { modal_open, getting_product, error_message },
  } = useInHouseCheckout();
  if (getting_product) {
    return <FormFieldSkeleton />;
  }
  if (error_message) {
    return <FormFieldError message={error_message} />;
  }
  if (renderType === 'modal') {
    return (
      <Fragment>
        <ModalComponent showPayment={modal_open} onClose={closeCheckoutModal}>
          <SelectIntegration />
        </ModalComponent>
        {children}
      </Fragment>
    );
  }
  // Default to rendering embedded
  return (
    <IntegrationWrapper>
      <SelectIntegration>{children}</SelectIntegration>
    </IntegrationWrapper>
  );
};
