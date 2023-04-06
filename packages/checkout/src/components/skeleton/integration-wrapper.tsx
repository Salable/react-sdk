import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './skeleton.module.css';
import { useInHouseCheckout } from '../../context/use-checkout';

interface IBackground {
  height?: string;
  width?: string;
  none?: boolean;
}

export interface IIntegrationWrapper {
  children?: React.ReactNode;
  topComponent?: React.ReactNode;
  background?: IBackground;
}

const getStyleValueString = (
  key: keyof Omit<IBackground, 'none'>,
  background?: IBackground
) => {
  if (!background || background?.none) return undefined;
  return background[key];
};

export const IntegrationWrapper: FC<IIntegrationWrapper> = ({
  children,
  topComponent,
  background,
}) => {
  const {
    state: { preview, integration_type, styles: customStyles },
  } = useInHouseCheckout();
  return (
    <div
      className={classNames(
        background?.none ? undefined : styles.integrationContainer
      )}
      style={{
        backgroundColor: background?.none
          ? 'none'
          : customStyles?.backgroundColor,
        height: getStyleValueString('height', background),
        width: getStyleValueString('width', background),
      }}
    >
      {topComponent}
      <div
        aria-readonly
        className={classNames(styles.integrationWrapper, {
          [styles.previewWrapper]: preview,
          [styles.stripeWrapper]: integration_type === 'stripe',
          [styles.paddleWrapper]: integration_type === 'paddle',
        })}
        tabIndex={preview ? -1 : 0}
        style={{
          fontFamily: customStyles?.fontFamily,
          borderRadius: customStyles?.borderRadius,
        }}
      >
        {integration_type === 'paddle' && preview ? (
          <div className={styles.paddlePreview}>
            <div className={styles.paddlePreview__message}>
              <h2>
                You will need to customize your Paddle Checkout from your Paddle
                Dashboard.
              </h2>
              <p className={styles.paddlePreview__message_sub}>
                You can find the customization page under <br />{' '}
                <strong>Checkout</strong> &#8594;{' '}
                <strong>Checkout settings</strong>.
              </p>
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
