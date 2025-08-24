import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NewsArticle } from '../../../entities/news/model/news.types';
import { NewsImage } from '../../../entities/news/ui/news-image';
import { formatDate } from '../../../shared/lib/format-date';

interface NewsCardProps {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
}

export const NewsCard = ({ article, onPress }: NewsCardProps) => {
  const handlePress = () => onPress(article);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {article && (
        <>
          <NewsImage url={article?.urlToImage} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {article?.title}
            </Text>

            <View style={styles.meta}>
              <Text style={styles.source}>{article?.source.name}</Text>
              <Text style={styles.date}>
                {formatDate(article?.publishedAt)}
              </Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#666',
    maxWidth: 200,
  },
  date: {
    fontSize: 12,
    color: '#999',
    maxWidth: 100,
  },
});
