import { useEffect, useState } from 'react';
import { IEnvironmentConfig, IPaddle } from '../../interfaces/paddle.interface';

const usePaddle = ({
  environment,
  vendor,
  eventCallback,
}: IEnvironmentConfig) => {
  const [paddle, setPaddle] = useState<IPaddle | null>(null);
  useEffect(() => {
    if (paddle) return;
    if (document.getElementById('paddle')) {
      const paddle = globalThis.Paddle;
      setPaddle(paddle);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      if (!global.Paddle) {
        return;
      }
      const paddle = globalThis.Paddle;
      if (environment) paddle.Environment.set(environment);
      paddle.Setup({ vendor, eventCallback });
      setPaddle(paddle);
    });
  }, [environment, vendor, paddle]);
  return { paddle };
};

export default usePaddle;
