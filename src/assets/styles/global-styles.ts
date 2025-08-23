import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(8, 9, 20, 0.06)',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  tabBarButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
