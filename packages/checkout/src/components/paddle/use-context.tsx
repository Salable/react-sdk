import { useContext } from 'react';
import { CheckoutContext } from './paddle.provider';
import { ICheckoutContext } from '../../interfaces/paddle.interface';

const useCheckout = (): ICheckoutContext => useContext(CheckoutContext);

export default useCheckout;
