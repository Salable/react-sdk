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
  topComponent?: React.ReactNode;
}

const paddleComponentId = 'paddle-wrapper';
const SelectIntegration: FC<IIntegrationProvider> = ({ children }) => {
  const {
    state: { integration_type, paddle, stripe, plan, params },
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

    return <StripeProvider planID={plan?.uuid} stripePubKey={stripePubKey} />;
  }
  if (integration_type === 'paddle') {
    if (!paddle?.planID) {
      throw new FrameError(
        "Payment integration can't be initialized",
        'developer',
        'Missing Plan ID'
      );
    }
    return (
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
          success: params.success_url,
          frameStyle: 'width:100%; min-width:376px; background-color: transparent; border: none;',
        }}
        productId={paddle.planID}
        targetComponent={paddleComponentId}
      >
        <Fragment>
          <div className={paddleComponentId} />
          {children}
        </Fragment>
      </PaddleCheckoutProvider>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export const IntegrationProvider: FC<IIntegrationProvider> = ({ children, topComponent }) => {
  const {
    renderType,
    closeCheckoutModal,
    state: { modal_open, getting_plan, error_message },
  } = useInHouseCheckout();
  if (getting_plan) {
    return (
      <IntegrationWrapper topComponent={topComponent}>
        <FormFieldSkeleton />
      </IntegrationWrapper>
    );
  }
  if (error_message) {
    return (
      <IntegrationWrapper topComponent={topComponent}>
        <FormFieldError message={error_message} />
      </IntegrationWrapper>
    );
  }
  if (renderType === 'modal') {
    return (
      <Fragment>
        <ModalComponent showPayment={modal_open} onClose={closeCheckoutModal}>
          <IntegrationWrapper topComponent={topComponent}>
            <PriceDetails />
            <SelectIntegration />
          </IntegrationWrapper>
        </ModalComponent>
        {children}
      </Fragment>
    );
  }
  // Default to rendering embedded
  return (
    <IntegrationWrapper topComponent={topComponent}>
      <PriceDetails />
      <SelectIntegration>{children}</SelectIntegration>
    </IntegrationWrapper>
  );
};
