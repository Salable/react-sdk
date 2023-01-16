import { IPaddle } from './interfaces/paddle.interface';

declare global {
  var vendor: number;
  var environment: string;
  function eventCallback(data: { event: string }): void;
  var Paddle: IPaddle;
}

export {};
