import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputEmail } from '../';

export default {
  title: 'Components/InputEmail',
  component: InputEmail,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof InputEmail>;

const EmbeddedTemplated: ComponentStory<typeof InputEmail> = (props) => {
  return <InputEmail {...props} />;
};

export const Embedded = EmbeddedTemplated.bind({});
Embedded.args = {
  label: 'Email',
};
