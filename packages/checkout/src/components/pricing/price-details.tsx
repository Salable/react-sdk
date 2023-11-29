import React from 'react';
import { useInHouseCheckout } from '../../context/use-checkout';
import styles from './pricing.module.css';

export const PriceDetails = () => {
  const {
    state: { plan, planCurrency },
  } = useInHouseCheckout();
  return (
    <p className={styles.pricing}>
      <span className={styles.pricing__label}>Price</span>
      <span className={styles.pricing__price}>
        {plan && plan.pricingType === 'paid' && planCurrency
          ? `${new Intl.NumberFormat(planCurrency.currency.shortName, {
              style: 'currency',
              currency: planCurrency.currency.shortName,
            }).format(planCurrency.price / 100)} / ${plan?.interval}`
          : 'Free'}
      </span>
    </p>
  );
};
