import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SalablePricingTableReact } from './SalablePricingTableReact';

export default {
  title: 'Salable Pricing Table',
  component: SalablePricingTableReact,
  argTypes: {},
} as ComponentMeta<typeof SalablePricingTableReact>;

const LightTemplate: ComponentStory<typeof SalablePricingTableReact> = (args) => (
  <SalablePricingTableReact {...args} />
);
const DarkTemplate: ComponentStory<typeof SalablePricingTableReact> = (args) => (
  <div
    style={{
      background: 'black',
      margin: 'auto',
    }}
  >
    <SalablePricingTableReact {...args} />
  </div>
);

const defaultEnvConfig = {
  productUuid: '55f4184a-b2d9-4c2e-b418-3d9a140e78d3',
  apiKey: 'N3MO0HpjQw8dgo9aFYxe28On1s6tyE2M3ZAoZip0',
  globalPlanOptions: {
    granteeId: 'example-grantee-id-123',
    successUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel',
  },
  environment: 'stg',
  state: 'preview',
};

const defaultCheckoutConfig = {
  member: 'example-member-123',
  customer: {
    email: 'customer@company.com',
  },
};

export const LightTheme = LightTemplate.bind({});
LightTheme.args = {
  envConfig: {
    ...defaultEnvConfig,
    theme: 'light',
  },
  checkoutConfig: {
    ...defaultCheckoutConfig,
  },
};

export const DarkTheme = DarkTemplate.bind({});
DarkTheme.args = {
  envConfig: {
    ...defaultEnvConfig,
    theme: 'dark',
  },
  checkoutConfig: {
    ...defaultCheckoutConfig,
  },
};

export const LightThemePreview = LightTemplate.bind({});
LightThemePreview.args = {
  envConfig: {
    ...defaultEnvConfig,
    state: 'preview',
    theme: 'light',
  },
  checkoutConfig: {
    ...defaultCheckoutConfig,
  },
};
