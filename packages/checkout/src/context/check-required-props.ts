import { FrameError } from '../util/message-error';
import { IRequiredProps, IRequiredTestProps } from './checkout.interface';

export const checkRequiredProps = ({
  production,
  demo,
  preview,
}: {
  production: IRequiredProps;
  demo: IRequiredTestProps;
  preview: boolean;
}) => {
  const validateString = (item?: string) =>
    typeof item !== 'string' || !item.trim();

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
  }

  if (preview) {
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
  }

  if (missingParams?.length) {
    throw new FrameError(
      `Missing or Invalid prop: ${missingParams.join(', ')}.`,
      'developer'
    );
  }
};
