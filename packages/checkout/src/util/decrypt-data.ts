/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import cryptoJs from 'crypto-js';

const decryptAccount = <T extends 'stripe' | 'paddle'>(
  data: string,
  key: string
): T extends 'stripe'
  ? { publishableKey: string; secretKey: string }
  : { paddleVendorId: string; paddleAuthKey: string } => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const decryptedData = cryptoJs.AES.decrypt(data, key).toString(cryptoJs.enc.Utf8);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(decryptedData);
};

export default decryptAccount;
