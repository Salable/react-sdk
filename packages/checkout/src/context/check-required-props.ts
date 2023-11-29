import { FrameError } from '../util/message-error';
import { IRequiredProps, IRequiredTestProps } from './checkout.interface';

interface ICheckoutRequiredProps {
  production: IRequiredProps;
  demo: IRequiredTestProps;
  preview: boolean;
}

export const checkRequiredProps = ({ production, demo, preview }: ICheckoutRequiredProps) => {
  const validateString = (item?: string) => typeof item !== 'string' || !item.trim();

  const validateObject = (item?: object | null) =>
    !item || typeof item !== 'object' || !Object.entries(item).length;

  const validateNumber = (item?: number) => !item;

  const missingParams: string[] = [];

  if (!preview) {
    if (validateString(production.APIKey)) {
      missingParams.push('API Key');
    }
    if (validateString(production.planID)) {
      missingParams.push('Plan ID');
    }
    if (validateString(production.granteeID)) {
      missingParams.push('Grantee ID');
    }
    if (validateString(production.memberID)) {
      missingParams.push('Member ID');
    }
    if (validateString(production.successURL)) {
      missingParams.push('Success URL');
    }
    if (validateString(production.cancelURL)) {
      const addAnd = missingParams.length ? 'and ' : '';
      missingParams.push(`${addAnd}Cancel URL`);
    }

    if (missingParams?.length) {
      throw new FrameError(`Missing or Invalid prop: ${missingParams.join(', ')}.`, 'developer');
    }
    return;
  }

  if (validateObject(demo.plan)) {
    missingParams.push('Plan');
  }
  if (validateNumber(demo.paddleVendorID)) {
    missingParams.push('Plan ID');
  }
  if (validateString(demo.stripePublishableKey)) {
    missingParams.push('Stripe Publishable Key');
  }
  if (validateString(demo.integrationType)) {
    missingParams.push('Integration Type');
  }

  if (missingParams?.length) {
    throw new FrameError(`Missing or Invalid prop: ${missingParams.join(', ')}.`, 'developer');
  }
};
