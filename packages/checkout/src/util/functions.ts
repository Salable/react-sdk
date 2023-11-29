import { SALABLE_API } from '../constants/constants';
import { FrameError } from './message-error';

interface IOptions {
  APIKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export const APIFetch = async <T>(endpoint: string, options: IOptions) => {
  if (!SALABLE_API) {
    throw new FrameError(
      'Missing API Domain',
      'developer',
      'API Domain is missing from the env file. Please, contact the Salable Team to resolve this error'
    );
  }
  const url = `${SALABLE_API}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': options.APIKey,
  };

  const config = {
    method: options.method,
    headers,
  };

  const response = await fetch(url, config);
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  const error = (await response.json()) as { error: string };
  throw new Error(error?.error ?? response.statusText);
};
