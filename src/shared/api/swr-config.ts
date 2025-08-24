import { AppState } from 'react-native';
import { SWRConfiguration } from 'swr';
import NetInfo from '@react-native-community/netinfo';
import { httpClient } from './http-client';
import { storage } from '../storage/storage';
import { setupSWRCache } from '../../app/providers/swr-cache';

function mmkvProvider() {
  const { swrCacheMap, persistCache } = setupSWRCache({
    set: storage.set.bind(storage),
    get: storage.getString.bind(storage),
  });

  AppState.addEventListener('change', function persistCacheOnAppBackground(s) {
    if (s === 'background') {
      persistCache();
    }
  });

  return swrCacheMap;
}

export const fetcher = (url: string) =>
  httpClient.get(url).then(res => res.data);

export const swrConfig: SWRConfiguration = {
  provider: mmkvProvider,
  isVisible: () => {
    return true;
  },
  initFocus(callback) {
    let appState = AppState.currentState;

    const onAppStateChange = (nextAppState: any) => {
      /* If it's resuming from background or inactive mode to active one */
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        callback();
      }
      appState = nextAppState;
    };

    // Subscribe to the app state change events
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      subscription.remove();
    };
  },
  initReconnect(callback) {
    const unsubscribe = NetInfo.addEventListener(s => {
      if (s.isInternetReachable && s.isConnected) {
        callback();
      }
    });

    return unsubscribe;
  },
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 300000, // 5 минут - увеличенный интервал дедупликации
  focusThrottleInterval: 60000, // 1 минута
  errorRetryCount: 2, // Уменьшаем количество попыток
  errorRetryInterval: 5000, // Увеличиваем интервал между попытками
  onError: error => {
    if (error.status === 429) {
      console.error('Превышен лимит запросов к NewsAPI');
    }
  },
};
