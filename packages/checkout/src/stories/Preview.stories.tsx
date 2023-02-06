import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckoutProvider } from '../context';

export default {
  title: 'Preview',
  component: CheckoutProvider,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CheckoutProvider>;

const EmbeddedTemplated: ComponentStory<typeof CheckoutProvider> = (props) => {
  return (
    <CheckoutProvider
      {...props}
      styles={{
        fontFamily: 'Roboto, system-ui, sans-serif',
        primaryColor: '#028737',
        spacingUnit: '2px',
        borderRadius: '20px',
      }}
      plan={{
        uuid: '4511e858-cc5d-438d-be9d-7824ea911bef',
        displayName: 'Paid Stri Plan',
        interval: 'month',
        length: 1,
        price: 499,
        pricingType: 'paid',
        currency: {
          shortName: 'USD',
          locale: 'en-US',
        },
      }}
    />
  );
};

export const Embedded = EmbeddedTemplated.bind({});
Embedded.args = {
  integrationType: 'stripe',
  paddleVendorID: 752,
  stripePublishableKey:
    'pk_test_51M4mzkChnZeGQTI0Vn4NxPL6hKlkmX0Why53tXh1PsJn7r57ccmcWtR6Ytbies2ttBy74zwcXMrIDzgx98bCpPeP00LBAMsW60',
};
