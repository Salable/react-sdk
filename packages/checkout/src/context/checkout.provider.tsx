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
import { ICheckoutStylingResponse } from '../interfaces/checkout.interface';
import { APIFetch } from '../util/functions';

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
  paddlePlanID,
  preview = false,
  topComponent,
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
      paddlePlanID,
    },
    preview,
  });

  const [state, dispatch] = useReducer(reducer, {
    ...initialCheckoutValues,
  });

  useMemo(() => {
    if (styles) {
      dispatch({
        type: 'GET_STYLING_SUCCESSFUL',
        payload: styles,
      });
    }
    if (!preview) return;
    if (!stripePublishableKey)
      throw new FrameError('Missing Stripe Publishable Key', 'developer');
    if (!integrationType)
      throw new FrameError('Missing Integration type', 'developer');
    dispatch({
      type: 'INITIALIZE_PREVIEW',
      payload: {
        paddle: {
          environment: 'sandbox',
          vendorID: paddleVendorID,
          planID: paddlePlanID,
        },
        stripe: {
          publishableKey: stripePublishableKey,
        },
        integration_type: integrationType,
        plan: plan || null,
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

  useMemo(() => {
    if (preview) return;
    if (!APIKey) throw new FrameError('Missing API Key', 'developer');
    if (!planID) throw new FrameError('Missing Plans ID', 'developer');
    if (!cancelURL) throw new FrameError('Missing Cancel URL', 'developer');
    if (!granteeID) throw new FrameError('Missing Grantee ID', 'developer');
    if (!memberID) throw new FrameError('Missing Member ID', 'developer');
    if (!successURL) throw new FrameError('Missing Success URl', 'developer');
    dispatch({
      type: 'INITIALIZE_PARAMS',
      payload: {
        params: {
          cancel_url: cancelURL,
          grantee_id: granteeID,
          member_id: memberID,
          success_url: successURL,
          plan_id: planID,
          api_key: APIKey,
        },
      },
    });
  }, [cancelURL, granteeID, memberID, successURL, planID, APIKey]);

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
      dispatch({ type: 'GET_PLAN' });
      try {
        const [planResponse, stylingResponse] = await Promise.allSettled([
          APIFetch<IPlan>(
            `/plans/${planID}?expand=[product.organisationPaymentIntegration,features.feature,features.enumValue, currencies.currency]`,
            {
              method: 'GET',
              APIKey,
            }
          ),
          APIFetch<ICheckoutStylingResponse>('/checkout/styling', {
            method: 'GET',
            APIKey,
          }),
        ]);
        if (planResponse.status === 'fulfilled') {
          dispatch({
            type: 'GET_PLAN_SUCCESSFUL',
            payload: {
              plan: planResponse.value,
            },
          });
        } else {
          dispatch({ type: 'GET_PLAN_FAILED' });
        }
        if (stylingResponse.status === 'fulfilled') {
          dispatch({
            type: 'GET_STYLING_SUCCESSFUL',
            payload: {
              ...stylingResponse.value.checkoutStyling,
              ...styles,
            },
          });
        } else {
          dispatch({
            type: 'GET_STYLING_FAILED',
          });
        }
      } catch (error) {
        dispatch({ type: 'GET_PLAN_FAILED' });
      }
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
      <IntegrationProvider topComponent={topComponent}>
        {children}
      </IntegrationProvider>
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
