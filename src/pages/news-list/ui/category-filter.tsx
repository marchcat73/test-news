import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CATEGORIES } from '../../../shared/config/constants';

interface CategoryFilterProps {
  selectedCategory: string | undefined;
  onSelectCategory: (category: string | undefined) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.category, !selectedCategory && styles.selected]}
        onPress={() => onSelectCategory(undefined)}
      >
        <Text style={[styles.text, !selectedCategory && styles.selectedText]}>
          Все
        </Text>
      </TouchableOpacity>

      {CATEGORIES.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.category,
            selectedCategory === category && styles.selected,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.text,
              selectedCategory === category && styles.selectedText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    maxHeight: 56,
    marginBottom: 6,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#666',
    textTransform: 'capitalize',
  },
  selectedText: {
    color: 'white',
  },
});
