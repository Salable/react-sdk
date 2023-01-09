import { FC, useEffect } from 'react';
import { IPricingTableReact } from './types';
import { JS_SDK_VERSION } from '../../../../constants';

export const SalablePricingTableReact: FC<IPricingTableReact> = ({
  envConfig,
  checkoutConfig,
}) => {
  let salable: any = null;

  useEffect(() => {
    if (!document.getElementById('salableCdnScript')) {
      const script = document.createElement('script');

      script.src = `https://cdn.salable.${
        !envConfig.environment || envConfig.environment === 'prod'
          ? 'app'
          : 'org'
      }/v${JS_SDK_VERSION}/index.js`;
      script.type = 'module';
      script.id = 'salableCdnScript';

      document.body.appendChild(script);

      envConfig.pricingTableNode = document.querySelector(
        '.salable-pricing-table-react'
      );

      script.addEventListener('load', () => {
        if (window.Salable) {
          (async () => {
            salable = new window.Salable(envConfig, checkoutConfig);
            await salable.init();
          })();
        }
      });
    }
    return () => {
      salable?.removeScripts();
      document.querySelector('.salable-pricing-table-container')?.remove();
      document.getElementById('salableCdnScript')?.remove();
    };
  }, [envConfig, checkoutConfig]);

  console.log(salable);

  return <div className="salable-pricing-table-react" />;
};
