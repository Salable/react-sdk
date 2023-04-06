import React from 'react';
import { IRenderType } from '../interfaces/context.interface';
import { IPaddleEventCallback } from '../interfaces/paddle.interface';
import { IPlan } from '../interfaces/plan.interface';

export type IIntegrationType = 'paddle' | 'stripe';

export interface ICheckoutStyle {
  fontFamily?: string;
  spacingUnit?: string;
  borderRadius?: string;
  primaryColor?: string;
  backgroundColor?: string;
}
export interface IRequiredTestProps {
  /**
   * For development purpose, when preview is `true`
   */
  plan?: IPlan | null;
  /**
   * For development purpose, when preview is `true`
   */
  styles?: ICheckoutStyle | null;
  /**
   * For development purpose, when preview is `true`
   */
  integrationType?: IIntegrationType;
  /**
   * For development purpose, when preview is `true`
   */
  stripePublishableKey?: string;
  /**
   * For development purpose, when preview is `true`
   */
  paddleVendorID?: number;
  /**
   * For development purpose, when preview is `true`
   */
  paddlePlanID?: string;
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

export interface ICheckoutProviderOptions extends IRequiredProps, IRequiredTestProps {
  /**
   * For development purpose. Default is `false`
   */
  preview?: boolean;
  /**
   * Default is `embedded`
   */
  renderType?: IRenderType;
  topComponent?: React.ReactNode;
  children?: React.ReactNode;
}
