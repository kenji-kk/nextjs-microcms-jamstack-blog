import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'kenji-blog',
  apiKey: process.env.API_KEY,
});
