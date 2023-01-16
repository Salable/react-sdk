export interface IProduct {
  uuid: string;
  organisationPaymentIntegration: {
    accountData: {
      publishableKey: string;
      secretKey: string;
    };
    accountName: string;
    integrationName: 'stripe' | 'paddle' | string;
    organisation: string;
    updatedAt: string;
    uuid: string;
  };
}
