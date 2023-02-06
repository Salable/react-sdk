import { useInHouseCheckout } from '../../context/use-checkout';
import styles from './pricing.module.css';

export const PriceDetails = () => {
  const {
    state: { plan },
  } = useInHouseCheckout();
  return (
    <p className={styles.pricing}>
      <span>Price</span>
      <span>
        {plan?.pricingType !== 'free' && plan?.currency
          ? `${new Intl.NumberFormat(plan.currency.locale, {
              style: 'currency',
              currency: plan.currency.shortName,
            }).format(plan.price / 100)} / ${plan?.interval}`
          : 'Free'}
      </span>
    </p>
  );
};
