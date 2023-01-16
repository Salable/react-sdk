import React, { FC, useCallback, useMemo, useReducer } from 'react';
import CheckoutContext, { ICheckoutContext } from './checkout.context';
import { ICheckoutProviderOptions } from './checkout.interface';
import { RenderIntegration } from '../components/providers/render-integration';
import { initialCheckoutValues, reducer } from './checkout.reducer';
import { ErrorBoundary } from '../components/error-boundary';
import { SALABLE_API } from '../constants/constants';
import { IProduct } from '../interfaces/product.interface';

const CheckoutProviderComponent: FC<ICheckoutProviderOptions> = ({
  apiKey,
  children,
  renderType,
  productId,
}) => {
  const [state, dispatch] = useReducer(reducer, initialCheckoutValues);

  // const fetchProduct = ;

  // 1. Fetch product details
  useMemo(() => {
    if (!apiKey || !productId) {
      dispatch({
        type: 'INITIALIZATION_FAILED',
        payload: { message: 'Missing Product ID or Credentials' },
      });
      return;
    }
    void (async () => {
      dispatch({ type: 'GET_PRODUCT' });
      try {
        const res = await fetch(
          `${SALABLE_API}/products/${productId}?expand=[organisationPaymentIntegration]`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
          }
        );
        const product = (await res.json()) as IProduct;
        if (!product?.organisationPaymentIntegration?.integrationName) {
          dispatch({
            type: 'INITIALIZATION_FAILED',
            payload: {
              message: "There's no payment provider for this product",
            },
          });
          return;
        }
        dispatch({ type: 'GET_PRODUCT_SUCCESSFUL', payload: { product } });
      } catch (error) {
        dispatch({
          type: 'GET_PRODUCT_FAILED',
          payload: {
            message: 'There was a problem getting product. Please try again.',
          },
        });
      }
    })();
  }, [productId, apiKey]);

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
    apiKey: apiKey,
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
      <RenderIntegration>{children}</RenderIntegration>
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
