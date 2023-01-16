export const SALABLE_API = process.env.REACT_APP_SALABLE_API_ENDPOINT || '';

if (!SALABLE_API) throw new Error('Missing API variable');
