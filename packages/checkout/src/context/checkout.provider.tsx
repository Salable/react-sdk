import React, { FC, useCallback, useMemo, useReducer } from 'react';
import { ICheckoutProviderOptions } from './checkout.interface';
import { initialCheckoutValues, reducer } from './checkout.reducer';
import { ErrorBoundary } from '../components/error-boundary';
import { IntegrationProvider } from '../components/integration-provider';
import CheckoutContext, { ICheckoutContext } from './checkout.context';
import { checkRequiredProps } from './check-required-props';
import { FrameError } from '../util/message-error';
import { SALABLE_API } from '../constants/constants';
import { IPlan } from '../interfaces/plan.interface';

const CheckoutProviderComponent: FC<ICheckoutProviderOptions> = ({
  integrationType,
  paddleVendorID,
  children,
  plan,
  renderType,
  stripePublishableKey,
  styles,
  APIKey,
  cancelURL,
  granteeID,
  memberID,
  paddle,
  planID,
  successURL,
  preview = false,
}) => {
  checkRequiredProps({
    production: {
      APIKey,
      cancelURL,
      granteeID,
      memberID,
      paddle,
      planID,
      successURL,
    },
    demo: {
      integrationType,
      paddleVendorID,
      plan,
      stripePublishableKey,
      styles,
    },
    preview,
  });

  const [state, dispatch] = useReducer(reducer, {
    ...initialCheckoutValues,
  });

  useMemo(() => {
    if (!preview) return;
    dispatch({
      type: 'INITIALIZE_PREVIEW',
      payload: {
        paddle: {
          environment: 'sandbox',
          vendorID: paddleVendorID,
        },
        stripe: {
          publishableKey: stripePublishableKey || '',
        },
        integration_type: integrationType || '',
        plan: plan || null,
        styles: styles || null,
      },
    });
  }, [
    paddleVendorID,
    stripePublishableKey,
    integrationType,
    plan,
    styles,
    preview,
  ]);

  /**
   * Fetch plan with details, payment integration
   * using PlanID and APIKey
   */
  useMemo(() => {
    if (preview) return;
    if (!SALABLE_API) throw new FrameError('Missing API Domain', 'developer');
    if (!planID) throw new FrameError('Missing Plan ID', 'developer');
    if (!APIKey) throw new FrameError('Missing API Key', 'developer');
    void (async () => {
      const response = await fetch(
        `${SALABLE_API}/plans/${planID}?expand=[product.organisationPaymentIntegration,features.feature,features.enumValue, currencies.currency]`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'x-api-key': APIKey },
        }
      );
      const data = (await response.json()) as IPlan;
      dispatch({ type: 'GET_PLAN_SUCCESSFUL', payload: { plan: data } });
    })();
  }, []);

  /**
   * Method will only work when `renderType` is of type `modal`
   */
  const openCheckoutModal = useCallback(() => {
    if (renderType === 'modal') {
      dispatch({ type: 'OPEN_MODAL' });
      return;
    }
  }, []);

  /**
   * Method will only work when `renderType` is of type `modal`
   * and modal is open
   */
  const closeCheckoutModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const values: ICheckoutContext = {
    preview: preview,
    state,
    openCheckoutModal,
    closeCheckoutModal,
    renderType: renderType || 'embedded',
  };

  /**
   * 3. Render the integration and any styling saved by the user.
   */
  return (
    <CheckoutContext.Provider value={values}>
      <IntegrationProvider>{children}</IntegrationProvider>
    </CheckoutContext.Provider>
  );
};

const CheckoutProvider: FC<ICheckoutProviderOptions> = (props) => {
  return (
    <ErrorBoundary>
      <CheckoutProviderComponent {...props} />
    </ErrorBoundary>
  );
};

export { CheckoutProvider };
