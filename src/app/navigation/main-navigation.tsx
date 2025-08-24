/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from './routes';
import { HomeSection } from './sections/home-section';
import { HomeIcon } from '../../assets/icons/home-icon';
import { globalStyle } from '../../assets/styles/global-styles';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={globalStyle.tabBarStyle}>
      {state.routes.map((route: Record<string, string>, index: number) => {
        const { options } = descriptors[route.key];

        const renderIcon =
          options.tabBarIcon !== undefined ? options.tabBarIcon : null;
        const label = options.title !== undefined ? options.title : route.name;
        const renderLabel =
          options.tabBarLabel !== undefined ? options.tabBarLabel : null;

        const isFocused = state.index === index;
        const color = isFocused
          ? 'rgba(168, 97, 59, 1)'
          : 'rgba(112, 113, 117, 1)';
        const labelColor = isFocused
          ? 'rgba(182, 54, 51, 1)'
          : 'rgba(112, 113, 117, 1)';
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={`${index}-${route.key}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={globalStyle.tabBarButton}>
              {renderIcon && renderIcon({ color })}
              <Text
                style={{
                  color: isFocused
                    ? 'rgba(182, 54, 51, 1)'
                    : 'rgba(112, 113, 117, 1)',
                  fontSize: 12,
                  textAlign: 'center',
                  fontWeight: '600',
                  marginTop: 4,
                }}
              >
                {renderLabel ? renderLabel({ color: labelColor }) : label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AppLayouts = () => {
  return (
    <BottomTabs.Navigator
      //   screenOptions={{ header: () => null, headerShown: false, lazy: false }}
      tabBar={props => <MyTabBar {...props} />}
      detachInactiveScreens={false}
    >
      <BottomTabs.Screen
        name={routes.HomeSection}
        component={HomeSection}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator
      // initialRouteName={routes.AppLayouts}
      screenOptions={{ header: () => null, headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={AppLayouts}
        options={{ header: () => null, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
