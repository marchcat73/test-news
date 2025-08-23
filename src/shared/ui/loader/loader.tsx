import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});
