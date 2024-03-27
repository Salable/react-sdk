import { FC, useEffect } from 'react';
import { IPricingTable, IPricingTableReact } from './types';
import { JS_SDK_VERSION } from '@/packages/constants';

export const SalablePricingTableReact: FC<IPricingTableReact> = ({ envConfig, checkoutConfig }) => {
  let pricingTable: IPricingTable = null;
  let rendered = false;

  useEffect(() => {
    if (!document.getElementById('salableCdnScript') && !rendered) {
      rendered = true;
      const script = document.createElement('script');

      script.src = `https://cdn.salable.${
        !envConfig.environment || envConfig.environment === 'prod' ? 'app' : 'org'
      }/v${JS_SDK_VERSION}/index.js`;
      script.type = 'module';
      script.id = 'salableCdnScript';

      document.body.appendChild(script);

      envConfig.pricingTableNode = document.querySelector('.salable-pricing-table-react');

      script.addEventListener('load', () => {
        if (window.SalablePricingTable) {
          (async () => {
            pricingTable = new window.SalablePricingTable(envConfig, checkoutConfig);
            document.querySelector('.salable-pricing-table-container')
              ? null
              : await pricingTable?.init();
          })().catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
        }
      });
    }

    return () => {
      pricingTable?.removeScripts();
      document.querySelector('.salable-pricing-table-container')?.remove();
      document.getElementById('salableCdnScript')?.remove();
    };
  }, [envConfig, checkoutConfig]);

  return <div className="salable-pricing-table-react" />;
};
