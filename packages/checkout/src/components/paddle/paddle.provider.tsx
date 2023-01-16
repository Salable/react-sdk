import React, { FC, useEffect, useState } from 'react';
import usePaddle from './use-paddle';
import {
  ICheckoutContext,
  IPaddleUserData,
} from '../../interfaces/paddle.interface';

const CheckoutContext = React.createContext<ICheckoutContext>({});

const PaddleCheckoutProvider: FC<ICheckoutContext> = ({
  environmentConfig,
  checkoutConfig,
  targetComponent,
  children,
  productId,
}) => {
  if (!environmentConfig) throw new Error('Must provide environmentConfig');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    productId || null
  );
  const [userData, setUserData] = useState<IPaddleUserData>({ sub: null });
  const [passthrough, setPassthrough] = useState({});

  const { paddle } = usePaddle({ environment: environmentConfig.environment });

  useEffect(() => {
    if (!paddle || !selectedProductId) return;
    const { sub, ...user } = userData;
    const checkoutParams: { [x: string]: string } = {
      method: 'inline',
      product: selectedProductId,
      passthrough: JSON.stringify({ sub, ...passthrough }),
      ...checkoutConfig,
      ...user,
    };
    if (targetComponent) checkoutParams.frameTarget = targetComponent;
    paddle.Checkout.open(checkoutParams);
  }, [paddle, selectedProductId]);

  return (
    <CheckoutContext.Provider
      value={{
        paddle,
        selectedProductId,
        setSelectedProductId,
        userData,
        setUserData,
        passthrough,
        setPassthrough,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { PaddleCheckoutProvider, CheckoutContext };
