import { SWRConfiguration } from 'swr';
import { httpClient } from './http-client';

export const fetcher = (url: string) =>
  httpClient.get(url).then(res => res.data);

export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  dedupingInterval: 60000,
};
