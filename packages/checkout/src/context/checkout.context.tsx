/**
 * Copyright (c) Salable.
 */

import { createContext, useContext } from 'react';
import { IRenderType } from '../interfaces/context.interface';
import { FrameError } from '../util/message-error';
import { initialCheckoutValues, ICheckoutState } from './checkout.reducer';

const stub = (): never => {
  throw new FrameError(
    'You forgot to wrap your component in <CheckoutProvider>.',
    'developer'
  );
};
export interface ICheckoutContext {
  preview: boolean;
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
  preview: false,
  state: initialCheckoutValues,
  renderType: 'embedded',
  openCheckoutModal: stub,
  closeCheckoutModal: stub,
};

const CheckoutContext = createContext<ICheckoutContext>(initialContext);

export const useCheckoutContext = (): ICheckoutContext =>
  useContext(CheckoutContext);

export default CheckoutContext;
