/**
 * Copyright (c) Salable.
 */

import { useContext } from 'react';
import CheckoutContext, { ICheckoutContext } from './checkout.context';

/**
 * ```ts
 * const {
 * // Checkout state:
 * // Checkout methods:
 *  openCheckoutModal
 *  closeCheckoutModal
 * } = useCheckout()
 * ```
 *
 * Use the `useCheckout` hook in your components to access the payment state and methods.
 */

const useCheckout = (): Pick<ICheckoutContext, 'openCheckoutModal'> => {
  const values = useContext(CheckoutContext);
  return {
    openCheckoutModal: values.openCheckoutModal,
  };
};

export const useInHouseCheckout = (): ICheckoutContext =>
  useContext(CheckoutContext);

export default useCheckout;
