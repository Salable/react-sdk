import { Dispatch, SetStateAction } from 'react';

export interface ICheckoutContext {
  environmentConfig?: IEnvironmentConfig;
  paddle?: unknown;
  targetComponent?: string;
  selectedProductId?: string | null;
  setSelectedProductId?: Dispatch<SetStateAction<string | null>>;
  userData?: unknown;
  setUserData?: Dispatch<SetStateAction<IPaddleUserData>>;
  passthrough?: unknown;
  setPassthrough?: Dispatch<SetStateAction<{ [key: string]: string }>>;
  checkoutConfig?: object;
  productId?: string;
  children?: React.ReactNode;
}

export interface IEnvironmentConfig {
  vendor?: number;
  environment?: string;
  eventCallback?: (data: { event: string }) => void;
}

export interface IPaddleUserData {
  sub: string | null;
  email?: string;
  country?: string;
  postcode?: string;
}

export interface IPaddle {
  Checkout: {
    open: (load: unknown) => void;
  };
  Environment: {
    set: (data: unknown) => void;
  };
  Setup: (data: unknown) => void;
}
export interface IGlobalPaddle {
  vendor: number;
  environment?: string;
  eventCallback?: (data: { event: string }) => void;
  paddle: IPaddle;
}
