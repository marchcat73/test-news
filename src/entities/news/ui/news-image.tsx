import React from 'react';
import { Image, View, StyleSheet, ImageStyle, Text } from 'react-native';

interface NewsImageProps {
  url: string | null;
  style?: ImageStyle;
}

export const NewsImage = ({ url, style }: NewsImageProps) => {
  if (!url) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>Нет изображения</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: url }}
      style={[styles.image, style]}
      resizeMode="cover"
      onError={() => console.log('Image loading failed')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
  },
});
