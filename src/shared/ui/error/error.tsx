import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error = ({ message, onRetry }: ErrorProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    {onRetry && <Button title="Попробовать снова" onPress={onRetry} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
