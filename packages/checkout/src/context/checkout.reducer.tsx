import { IPlan, IPlanCurrency, IProduct } from '../interfaces/plan.interface';
import decryptAccount from '../util/decrypt-data';

export interface ICheckoutState {
  getting_plan: boolean;
  modal_open: boolean;
  preview: boolean;
  error_message: string | null;
  params: PaymentParams;
  product: IProduct | null;
  planCurrency: IPlanCurrency | null;
  styles: {
    [x: string]: string;
  } | null;
  plan: IPlan | null;
  paddle: IPaddleIntegrationProps | null;
  stripe: IStripeIntegrationProps | null;
  integration_type: string | null;
}

export type ICheckoutAction =
  | {
      type: 'INITIALIZE_PREVIEW';
      payload: Pick<
        ICheckoutState,
        'integration_type' | 'paddle' | 'stripe' | 'plan' | 'styles'
      >;
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
  getting_plan: false,
  modal_open: false,
  preview: false,
  planCurrency: null,
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
    case 'GET_PLAN': {
      return {
        ...state,
        getting_plan: true,
      };
    }
    case 'GET_PLAN_SUCCESSFUL': {
      const { plan } = action.payload;
      const integrationType =
        plan.product.organisationPaymentIntegration.integrationName;
      const accountData =
        plan.product.organisationPaymentIntegration.accountData;
      return {
        ...state,
        getting_plan: false,
        error_message: null,
        plan,
        integration_type: integrationType,
        product: plan.product,
        stripe:
          integrationType === 'stripe'
            ? {
                publishableKey: decryptAccount<'stripe'>(
                  accountData.encryptedData,
                  accountData.key
                ).publishableKey,
              }
            : null,
        paddle:
          integrationType === 'paddle'
            ? {
                environment:
                  action.payload.plan.environment === 'dev'
                    ? 'sandbox'
                    : undefined,
                vendorID: parseInt(
                  decryptAccount<'paddle'>(
                    accountData.encryptedData,
                    accountData.key
                  ).paddleVendorId
                ),
              }
            : null,
        // In the future, currency you should be selected based on user's locale
        planCurrency: plan.currencies[0],
      };
    }
    case 'GET_PLAN_FAILED':
    case 'INITIALIZATION_FAILED': {
      return {
        ...state,
        getting_plan: false,
        error_message: action.payload.message,
      };
    }
    default:
      return state;
  }
};
