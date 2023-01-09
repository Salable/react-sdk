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
    };
    checkoutConfig: {
        member: string;
        email?: string;
        postcode?: string;
        country?: string;
    };
}
declare global {
    interface Window {
        Salable: any;
    }
}
