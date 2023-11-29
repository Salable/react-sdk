import { Dispatch, SetStateAction } from 'react';

export interface IPaddleEventCallback {
  /**
   * Checkout has been initialized on the page
   */
  onLoaded?: () => void;
  /**
   * Checkout has been closed on the page.
   * This is equivalent to when the "closeCallback" checkout parameter is fired [here](https://developer.paddle.com/guides/b299bce2a2f40-post-checkout#checkout-success--close-callbacks).
   */
  onClose?: () => void;
  /**
   * Checkout has been completed successfully.
   * This is equivalent to when the "successCallback" checkout parameter is fired [here](https://developer.paddle.com/guides/b299bce2a2f40-post-checkout#checkout-success--close-callbacks).
   */
  onComplete?: () => void;
  /**
   * User has opted into/out of marketing emails in the checkout
   */
  onUserSubscribed?: () => void;
  /**
   * User has changed the quantity in the checkout
   */
  onQuantityChange?: () => void;
  /**
   * User has proceeded past the email checkout step
   */
  onLogin?: () => void;
  /**
   * User selected 'Not you? Change' in bottom right of checkout
   */
  onLogout?: () => void;
  /**
   * Payment method has been selected
   */
  onPaymentMethodSelected?: () => void;
  /**
   * User clicked 'Add Coupon'
   */
  onCouponAdd?: () => void;
  /**
   * User has submitted a coupon
   */
  onCouponSubmit?: () => void;
  /**
   * User has cancelled the coupon page
   */
  onCouponCancel?: () => void;
  /**
   * Valid coupon applied to purchase
   */
  onCouponApplied?: () => void;
  /**
   * Coupon has been removed
   */
  onCouponRemoved?: () => void;
  /**
   * Any generic checkout error, like an invalid VAT number or payment failure
   */
  onError?: () => void;
  /**
   * User proceeded past the location page
   */
  onLocationSubmit?: () => void;
  /**
   * Language has been changed in the bottom right
   */
  onLanguageChange?: () => void;
  /**
   * User clicked 'Add VAT Number'
   */
  onVatAdd?: () => void;
  /**
   * VAT screen cancelled
   */
  onVatCancel?: () => void;
  /**
   * VAT number was submitted
   */
  onVatSubmit?: () => void;
  /**
   * VAT number was accepted and applied
   */
  onVatApplied?: () => void;
  /**
   * VAT number was removed
   */
  onVatRemove?: () => void;
  /**
   * User completed a checkout with Wire Transfer as the selected payment type.
   * Always fired with `onOfflinePaymentDetailsComplete`.
   */
  onWireTransferComplete?: () => void;
  /**
   * User has completed a checkout and selected an
   * offline payment type (in this scenario, any details that the user needs to make their payment offline, are displayed).
   */
  onOfflinePaymentDetailsComplete?: () => void;
  /**
   * Payment has been completed successfully.
   *
   * Check if the payment has been [flagged for manual fraud review](https://www.paddle.com/help/manage/risk-prevention/what-are-'flagged-orders'?_gl=1*3llvve*_ga*MTAxODc2NzEuMTY2NjExMTI0Ng..*_ga_9XVE7HZLLZ*MTY2NzkyNDE3OS42LjEuMTY2NzkyNTAxNy4wLjAuMA..)
   * in the eventData.flagged property, which returns a boolean value of `true` or `false`
   */
  onPaymentComplete?: () => void;
  /**
   * User has selected "Change Payment Method" when on the payment screen
   */
  onPaymentMethodChange?: () => void;
  /**
   * User has selected "Change Payment Method" when on the Wire Transfer screen
   */
  onWireTransferPaymentMethodChange?: () => void;
}

export interface ICheckoutContext {
  environmentConfig?: IEnvironmentConfig;
  paddle?: unknown;
  targetComponent?: string;
  selectedProductId?: string | null;
  setSelectedProductId?: Dispatch<SetStateAction<string | null>>;
  userData?: unknown;
  setUserData?: Dispatch<SetStateAction<IPaddleUserData>>;
  passthrough?: unknown;
  setPassthrough?: Dispatch<SetStateAction<{ [key: string]: string }>>;
  checkoutConfig?: object;
  productId?: string;
  children?: React.ReactNode;
}

export interface IEnvironmentConfig {
  vendor?: number;
  environment?: string;
  eventCallback?: (data: { event: string }) => void;
}

export interface IPaddleUserData {
  sub: string | null;
  email?: string;
  country?: string;
  postcode?: string;
}

export interface IPaddle {
  Checkout: {
    open: (load: unknown) => void;
  };
  Environment: {
    set: (data: unknown) => void;
  };
  Setup: (data: unknown) => void;
}
export interface IGlobalPaddle {
  vendor: number;
  environment?: string;
  eventCallback?: (data: { event: string }) => void;
  paddle: IPaddle;
}
