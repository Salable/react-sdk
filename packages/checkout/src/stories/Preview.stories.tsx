import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckoutProvider } from '../context';

export default {
  title: 'Preview',
  component: CheckoutProvider,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CheckoutProvider>;

const EmbeddedTemplated: ComponentStory<typeof CheckoutProvider> = (props) => {
  return (
    <CheckoutProvider
      {...props}
      plan={{
        uuid: '4511e858-cc5d-438d-be9d-7824ea911bef',
        name: 'paid stri plan',
        description: null,
        displayName: 'Paid Stri Plan',
        status: 'ACTIVE',
        trialDays: null,
        evaluation: false,
        evalDays: 0,
        organisation: 'org_Nnz6gerYh3VMhFyJ',
        visibility: 'public',
        licenseType: 'customId',
        interval: 'month',
        length: 1,
        active: true,
        planType: 'Standard',
        pricingType: 'paid',
        environment: 'dev',
        type: 'custom',
        paddlePlanId: null,
        productUuid: '83ab21da-c265-4067-8e91-a088c53286a9',
        product: {
          uuid: '83ab21da-c265-4067-8e91-a088c53286a9',
          name: 'paid stripe pro',
          description: 'Paid stripe product',
          logoUrl: null,
          displayName: 'Paid Stripe Pro',
          organisation: 'org_Nnz6gerYh3VMhFyJ',
          status: 'ACTIVE',
          paid: true,
          organisationPaymentIntegrationUuid:
            'bf16ff05-6c21-4c77-a128-21770fd97648',
          paymentIntegrationProductId: 'prod_NBqOEJhv99fkBN',
          updatedAt: '2023-01-18T03:52:43.061Z',
          organisationPaymentIntegration: {
            uuid: 'bf16ff05-6c21-4c77-a128-21770fd97648',
            organisation: 'org_Nnz6gerYh3VMhFyJ',
            integrationName: 'stripe',
            accountName: 'Stripe salable dev',
            accountData: {
              key: 'b3c4c9eba6ce97a1b1c7f775cc278f5ef3194853a5535236cb7837157b0b21ba703035245d72ff1335f5f55f8a86199a2da25e4bbcfb3a64c5c99546e424e664',
              encryptedData:
                'U2FsdGVkX1+7MTLWAyMwSsn/qOJynQyUW/LcUnXmz0O//A3Yb/Xtec7VvZVbwi0yItVTty9Jvniabg1UtUCOEEdrDGXMyyQfir0GgUwQbUeCzeEOM4EYVi8rG2nmXxy4SzzX6uNuaNQVtCDYf5n4u+uEx3HNXj7UDKuvxwmXo7//RNOAvps1mUST5WkqX8QDVI9TPKlb4+bVWGk3JFbQ9I19cS/Yt3Bln2DIzMP3NU8kfdyKNl/JfK7HRBD5YwVBfKZwQVMQfiJ3gmQOcI6CDvkDXjfJlR1IKjFLhZYZ4REfpab1iE8cUi/v/BYud1gMBJTiJreJRPCyVD5KFXFkMApvVUJ9EHVdk+cEEoj+8lk=',
            },
            accountId: 'acct_1M4mzkChnZeGQTI0',
            updatedAt: '2023-01-25T19:20:28.864Z',
          },
        },
        salablePlan: false,
        updatedAt: '2023-01-18T03:56:34.108Z',
        features: [
          {
            planUuid: '4511e858-cc5d-438d-be9d-7824ea911bef',
            featureUuid: '9927a63a-49e2-4728-b82d-a8356bc0262c',
            value: '5',
            enumValueUuid: null,
            isUnlimited: false,
            updatedAt: '2023-01-18T03:56:34.109Z',
            feature: {
              uuid: '9927a63a-49e2-4728-b82d-a8356bc0262c',
              name: 'feature stage',
              description: '',
              displayName: 'Feature Stage',
              variableName: 'feature_stage',
              status: 'ACTIVE',
              visibility: 'public',
              valueType: 'numerical',
              defaultValue: '5',
              showUnlimited: true,
              productUuid: '83ab21da-c265-4067-8e91-a088c53286a9',
              updatedAt: '2023-01-18T03:55:08.811Z',
            },
            enumValue: null,
          },
          {
            planUuid: '4511e858-cc5d-438d-be9d-7824ea911bef',
            featureUuid: 'a9cda8a2-450c-4270-85de-081ba9860a14',
            value: 'true',
            enumValueUuid: null,
            isUnlimited: false,
            updatedAt: '2023-01-18T03:56:34.109Z',
            feature: {
              uuid: 'a9cda8a2-450c-4270-85de-081ba9860a14',
              name: 'feat strip',
              description: '',
              displayName: 'Feat Strip',
              variableName: 'feat_strip',
              status: 'ACTIVE',
              visibility: 'public',
              valueType: 'boolean',
              defaultValue: 'true',
              showUnlimited: false,
              productUuid: '83ab21da-c265-4067-8e91-a088c53286a9',
              updatedAt: '2023-01-18T03:54:04.279Z',
            },
            enumValue: null,
          },
        ],
        currencies: [
          {
            planUuid: '4511e858-cc5d-438d-be9d-7824ea911bef',
            currencyUuid: 'd0c08cdb-d643-4855-8d26-93a2237596e7',
            price: 499,
            paymentIntegrationPlanId: 'plan_NBqSVaK5cUfe8g',
            currency: {
              uuid: 'd0c08cdb-d643-4855-8d26-93a2237596e7',
              shortName: 'USD',
              longName: 'United States Dollar',
              symbol: '$',
            },
          },
        ],
      }}
    />
  );
};

export const Embedded = EmbeddedTemplated.bind({});
Embedded.args = {
  preview: true,
  paddlePlanID: '16504',
  integrationType: 'paddle',
  paddleVendorID: 752,
  stripePublishableKey:
    'pk_test_51M4mzkChnZeGQTI0Vn4NxPL6hKlkmX0Why53tXh1PsJn7r57ccmcWtR6Ytbies2ttBy74zwcXMrIDzgx98bCpPeP00LBAMsW60',
  styles: {
    fontFamily:
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    primaryColor: '#028737',
    backgroundColor: '#525f7f',
    spacingUnit: '4px',
    borderRadius: '20px',
  },
};
