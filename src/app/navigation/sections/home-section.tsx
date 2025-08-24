import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsList } from '../../../pages/news-list/ui/news-list';
import { NewsDetail } from '../../../pages/news-detail/ui/news-detail';
import { routes } from '../routes';

const Stack = createNativeStackNavigator();

export const HomeSection = (props: {}) => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null, headerShown: false }}>
      <Stack.Screen
        name={routes.NewsListScreen}
        component={NewsList}
        options={{ title: 'Новости' }}
        {...props}
      />
      <Stack.Screen
        name={routes.NewsDetailScreen}
        component={NewsDetail}
        options={{ title: 'Детали новости' }}
        {...props}
      />
    </Stack.Navigator>
  );
};
