import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckoutProvider } from '../context';

export default {
  title: 'Production',
  component: CheckoutProvider,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CheckoutProvider>;

const EmbeddedTemplated: ComponentStory<typeof CheckoutProvider> = ({
  planID,
  APIKey,
  successURL,
  cancelURL,
  granteeID,
  memberID,
}) => {
  return (
    <CheckoutProvider
      planID={planID}
      APIKey={APIKey}
      successURL={successURL}
      cancelURL={cancelURL}
      granteeID={granteeID}
      memberID={memberID}
    />
  );
};

export const Embedded = EmbeddedTemplated.bind({});
Embedded.args = {
  planID: '',
  APIKey: '',
  successURL: '',
  cancelURL: '',
  granteeID: '',
  memberID: '',
};
