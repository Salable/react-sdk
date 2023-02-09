import React from 'react';
import { IRenderType } from '../interfaces/context.interface';
import { IPaddleEventCallback } from '../interfaces/paddle.interface';
import { IPlan } from '../interfaces/plan.interface';

export type IIntegrationType = 'paddle' | 'stripe';

export interface ICheckoutStyle {
  [x: string]: string;
}
export interface IRequiredTestProps {
  plan?: IPlan | null;
  styles?: ICheckoutStyle | null;
  integrationType?: IIntegrationType;
  stripePublishableKey?: string;
  paddleVendorID?: number;
}

export interface IRequiredProps {
  APIKey?: string;
  /**
   * A valid plan ID is required
   */
  planID?: string;
  /**
   * A return URL when payment is completed
   */
  successURL?: string;
  /**
   * A return URL when payment is canceled by user
   */
  cancelURL?: string;
  /**
   * What will be licensed
   */
  granteeID?: string;
  /**
   * Who it will be licensed to
   */
  memberID?: string;

  paddle?: IPaddleEventCallback;
}

export interface ICheckoutProviderOptions
  extends IRequiredProps,
    IRequiredTestProps {
  /**
   * For development purpose. Default is `false`
   */
  preview?: boolean;
  /**
   * Default is `embedded`
   */
  renderType?: IRenderType;
  children?: React.ReactNode;
}
