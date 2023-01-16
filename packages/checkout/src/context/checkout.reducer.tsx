import { IProduct } from '../interfaces/product.interface';

export type ICheckoutAction =
  | { type: 'GET_PRODUCT' }
  | {
      type: 'GET_PRODUCT_SUCCESSFUL';
      payload: { product: IProduct };
    }
  | {
      type: 'GET_PRODUCT_FAILED';
      payload: { message: string };
    }
  | {
      type: 'INITIALIZATION_FAILED';
      payload: { message: string };
    }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' };

export interface ICheckoutState {
  getting_product: boolean;
  modal_open: boolean;
  error_message: string | null;
  product: IProduct | null;
  integration_type: string | null;
}

export const initialCheckoutValues: ICheckoutState = {
  getting_product: false,
  modal_open: false,
  product: null,
  error_message: null,
  integration_type: null,
};

/**
 * Handles how the state changes in the `useCheckout` hook.
 */
export const reducer = (
  state: ICheckoutState,
  action: ICheckoutAction
): ICheckoutState => {
  switch (action.type) {
    case 'GET_PRODUCT': {
      return {
        ...state,
        getting_product: true,
      };
    }
    case 'GET_PRODUCT_SUCCESSFUL': {
      return {
        ...state,
        getting_product: false,
        error_message: null,
        product: action.payload.product,
        integration_type:
          action.payload.product.organisationPaymentIntegration.integrationName,
      };
    }
    case 'GET_PRODUCT_FAILED':
    case 'INITIALIZATION_FAILED': {
      return {
        ...state,
        getting_product: false,
        error_message: action.payload.message,
      };
    }
    default:
      return state;
  }
};
