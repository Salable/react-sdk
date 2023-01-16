import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckoutProvider } from '../index';

export default {
  title: 'Render/Embedded',
  component: CheckoutProvider,
  argTypes: {},
} as ComponentMeta<typeof CheckoutProvider>;

const EmbeddedTemplated: ComponentStory<typeof CheckoutProvider> = ({
  productId,
  apiKey,
}) => {
  return <CheckoutProvider productId={productId} apiKey={apiKey} />;
};

export const Embedded = EmbeddedTemplated.bind({});
Embedded.args = {
  productId: '',
  apiKey: '',
};
