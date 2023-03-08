import React, { useInHouseCheckout } from '../../context/use-checkout';
import styles from './pricing.module.css';

export const PriceDetails = () => {
  const {
    state: { plan, planCurrency },
  } = useInHouseCheckout();
  return (
    <p className={styles.pricing}>
      <span>Price</span>
      <span>
        {plan && plan.pricingType !== 'free' && planCurrency
          ? `${new Intl.NumberFormat(planCurrency.currency.shortName, {
              style: 'currency',
              currency: planCurrency.currency.shortName,
            }).format(planCurrency.price / 100)} / ${plan?.interval}`
          : 'Free'}
      </span>
    </p>
  );
};
