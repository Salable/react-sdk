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
  planID: '4511e858-cc5d-438d-be9d-7824ea911bef',
  APIKey: '77wA2OEXmNLhElAYZBMWCKvjj2QFvZ1EjpUBGhf0',
  successURL: 'http://localhost:6006?path=/story/production--embedded',
  cancelURL: 'localhost:6006',
  granteeID: 'example-grantee-123',
  memberID: 'example-member-123',
};
