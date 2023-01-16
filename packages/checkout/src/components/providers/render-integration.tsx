import React, { FC, Fragment } from 'react';
import { useCheckoutContext } from '../../context/checkout.context';
import { ModalComponent } from '../modal/modal';
import { PaddleCheckoutProvider } from '../paddle/paddle.provider';
import FormFieldError from '../skeleton/error.skeleton';
import FormFieldSkeleton from '../skeleton/loading.skeleton';
import { StripeProvider } from '../stripe/stripe.provider';

interface IRenderIntegration {
  children?: React.ReactNode;
}

const paddleComponentId = 'paddle-wrapper';
const SelectIntegration: FC<IRenderIntegration> = ({ children }) => {
  const {
    state: { integration_type, product },
  } = useCheckoutContext();
  const productId = product?.uuid;
  const stripePubKey =
    product?.organisationPaymentIntegration.accountData.publishableKey || '';
  if (integration_type === 'stripe') {
    return (
      <Fragment>
        <StripeProvider productId="" stripePubKey={stripePubKey} />
        {children}
      </Fragment>
    );
  }
  if (integration_type === 'paddle') {
    return (
      <PaddleCheckoutProvider
        environmentConfig={{
          vendor: 752,
          environment: 'sandbox',
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
            'width:100%; min-width:312px; background-color: transparent; border: none;',
        }}
        productId={productId}
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

export const RenderIntegration: FC<IRenderIntegration> = ({ children }) => {
  const {
    renderType,
    closeCheckoutModal,
    state: { modal_open, getting_product, error_message },
  } = useCheckoutContext();
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
  return <SelectIntegration>{children}</SelectIntegration>;
};
