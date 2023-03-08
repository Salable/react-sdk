import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './skeleton.module.css';
import { useInHouseCheckout } from '../../context/use-checkout';

export const IntegrationWrapper: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    state: { preview, integration_type },
  } = useInHouseCheckout();
  return (
    <div
      aria-readonly
      className={classNames(styles.integrationWrapper, {
        [styles.previewWrapper]: preview,
        [styles.stripeWrapper]: integration_type === 'stripe',
        [styles.paddleWrapper]: integration_type === 'paddle',
      })}
      tabIndex={preview ? -1 : 0}
    >
      {children}
    </div>
  );
};
