export interface IPricingTableCta {
  text?: string;
  callback?: string;
  visibility?: string;
}

export interface IPricingTableDefaultPlanOptions {
  cta?: IPricingTableCta;
  successUrl?: string;
  cancelUrl?: string;
  granteeId?: string;
  contactUsLink?: string;
}

export interface IPricingTableReact {
  envConfig: {
    pricingTableNode?: Element | null;
    productUuid: string;
    apiKey: string;
    globalPlanOptions?: IPricingTableDefaultPlanOptions;
    individualPlanOptions?: {
      [key: string]: IPricingTableDefaultPlanOptions;
    };
    theme?: string;
    environment?: string;
    state?: string;
  };
  checkoutConfig: {
    member: string;
    marketingConsent?: string;
    couponCode?: string;
    customer: {
      email: string;
      postcode?: string;
      country?: string;
    };
    vat?: {
      number?: string;
      companyName?: string;
      street?: string;
      state?: string;
      city?: string;
      country?: string;
      postcode?: string;
    };
  };
}

declare global {
  interface Window {
    Salable: {
      init: () => void;
    };
  }
}
