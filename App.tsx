/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SWRConfig } from 'swr';
import { swrConfig } from './src/shared/api/swr-config';
import MainNavigation from './src/app/navigation/main-navigation';

const App = (): React.JSX.Element => {
  return (
    <SWRConfig value={swrConfig}>
      <NavigationContainer navigationInChildEnabled>
        <MainNavigation />
      </NavigationContainer>
    </SWRConfig>
  );
};

export default App;
