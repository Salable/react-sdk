import { IPlan, IPlanCurrency, IProduct } from '../interfaces/plan.interface';
import decryptAccount from '../util/decrypt-data';
import { transformUnit } from '../util/transform-unit';
import { ICheckoutStyle } from './checkout.interface';

export interface ICheckoutState {
  getting_plan: boolean;
  modal_open: boolean;
  preview: boolean;
  error_message: string | null;
  params: PaymentParams;
  product: IProduct | null;
  planCurrency: IPlanCurrency | null;
  styles: (ICheckoutStyle & { spacingUnit3?: string }) | null;
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
        'integration_type' | 'paddle' | 'stripe' | 'plan'
      >;
    }
  | { type: 'GET_PLAN' }
  | {
      type: 'GET_PLAN_SUCCESSFUL';
      payload: {
        plan: IPlan;
      };
    }
  | {
      type: 'INITIALIZE_PARAMS';
      payload: {
        params: PaymentParams;
      };
    }
  | {
      type: 'GET_PLAN_FAILED';
      payload?: { message?: string };
    }
  | {
      type: 'GET_STYLING_SUCCESSFUL';
      payload: ICheckoutStyle;
    }
  | { type: 'GET_STYLING_FAILED' }
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
  planID?: string;
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
  styles: {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    backgroundColor: '#F8F9FF',
    primaryColor: '#554FFD',
    spacingUnit: '4px',
    borderRadius: '4px',
  },
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
      };
    }
    case 'INITIALIZE_PARAMS': {
      const { payload } = action;
      return {
        ...state,
        params: payload.params,
      };
    }
    case 'GET_STYLING_SUCCESSFUL': {
      const { payload } = action;
      return {
        ...state,
        styles: {
          ...state.styles,
          ...payload,
          spacingUnit3: transformUnit(
            state.styles?.spacingUnit || '',
            payload?.spacingUnit,
            3
          ),
          borderRadius: transformUnit(
            state.styles?.borderRadius || '',
            payload?.borderRadius
          ),
        },
      };
    }
    case 'GET_STYLING_FAILED': {
      return {
        ...state,
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
                environment: plan.environment === 'dev' ? 'sandbox' : undefined,
                vendorID: parseInt(
                  decryptAccount<'paddle'>(
                    accountData.encryptedData,
                    accountData.key
                  ).paddleVendorId
                ),
                planID: plan.paddlePlanId || undefined,
              }
            : null,
        // In the future, currency you should be selected based on user's locale
        planCurrency: plan.currencies[0],
      };
    }
    case 'GET_PLAN_FAILED': {
      return {
        ...state,
        getting_plan: false,
        error_message:
          action?.payload?.message || 'Failed to get plan required for payment',
      };
    }
    default:
      return state;
  }
};
