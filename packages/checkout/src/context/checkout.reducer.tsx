import { IPlan, IProduct } from '../interfaces/product.interface';

export interface ICheckoutState {
  getting_product: boolean;
  getting_plan: boolean;
  modal_open: boolean;
  preview: boolean;
  error_message: string | null;
  params: PaymentParams;
  product: IProduct | null;
  styles: {
    [x: string]: string;
  } | null;
  plan: IPlan | null;
  paddle: IPaddleIntegrationProps | null;
  stripe: IStripeIntegrationProps | null;
  integration_type: string | null;
}

export type ICheckoutAction =
  | { type: 'GET_PRODUCT' }
  | {
      type: 'GET_PRODUCT_SUCCESSFUL';
      payload: { product: IProduct };
    }
  | {
      type: 'INITIALIZE_PREVIEW';
      payload: Pick<
        ICheckoutState,
        'integration_type' | 'paddle' | 'stripe' | 'plan' | 'styles'
      >;
    }
  | {
      type: 'GET_PRODUCT_FAILED';
      payload: { message: string };
    }
  | { type: 'GET_PLAN' }
  | {
      type: 'GET_PLAN_SUCCESSFUL';
      payload: { plan: IPlan };
    }
  | {
      type: 'GET_PLAN_FAILED';
      payload: { message: string };
    }
  | {
      type: 'INITIALIZATION_FAILED';
      payload: { message: string };
    }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' };

export interface PaymentParams {
  cancel_url: string | null;
  grantee_id: string | null;
  member_id: string | null;
  success_url: string | null;
  plan_id: string | null;
  api_key: string | null;
}

export interface IPaddleIntegrationProps {
  vendorID?: number;
  environment?: string;
}

export interface IStripeIntegrationProps {
  publishableKey: string;
}

export const initialCheckoutValues: ICheckoutState = {
  getting_product: false,
  getting_plan: false,
  modal_open: false,
  preview: false,
  params: {
    cancel_url: null,
    success_url: null,
    plan_id: null,
    grantee_id: null,
    member_id: null,
    api_key: null,
  },
  product: null,
  paddle: null,
  stripe: null,
  styles: null,
  plan: null,
  error_message: null,
  integration_type: 'paddle',
};

/**
 * Handles how the state changes in the `useCheckout` hook.
 */
export const reducer = (
  state: ICheckoutState,
  action: ICheckoutAction
): ICheckoutState => {
  switch (action.type) {
    case 'INITIALIZE_PREVIEW': {
      const { payload } = action;
      return {
        ...state,
        preview: true,
        paddle: payload.paddle,
        integration_type: payload.integration_type,
        stripe: payload.stripe,
        plan: payload.plan,
        styles: payload.styles,
      };
    }
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
    case 'GET_PLAN': {
      return {
        ...state,
        getting_product: true,
      };
    }
    case 'GET_PLAN_SUCCESSFUL': {
      return {
        ...state,
        getting_plan: false,
        error_message: null,
        plan: action.payload.plan,
      };
    }
    default:
      return state;
  }
};
