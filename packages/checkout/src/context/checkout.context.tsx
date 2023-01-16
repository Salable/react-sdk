/**
 * Copyright (c) Salable.
 */

import { createContext, useContext } from 'react';
import { IRenderType } from './checkout.interface';
import { initialCheckoutValues, ICheckoutState } from './checkout.reducer';

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <CheckoutProvider>.');
};
export interface ICheckoutContext {
  apiKey: string;
  state: ICheckoutState;
  renderType: IRenderType;
  /**
   * This method can only be used when render type is of `modal`
   */
  openCheckoutModal: () => void;
  /**
   * This method can only be used when render type is of `modal`
   */
  closeCheckoutModal: () => void;
}

const initialContext: ICheckoutContext = {
  apiKey: '',
  state: initialCheckoutValues,
  renderType: 'embedded',
  openCheckoutModal: stub,
  closeCheckoutModal: stub,
};

const CheckoutContext = createContext<ICheckoutContext>(initialContext);

export const useCheckoutContext = (): ICheckoutContext =>
  useContext(CheckoutContext);

export default CheckoutContext;
