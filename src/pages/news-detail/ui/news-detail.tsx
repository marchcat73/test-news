import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NewsArticle } from '../../../entities/news/model/news.types';
import { NewsImage } from '../../../entities/news/ui/news-image';
import { formatDate } from '../../../shared/lib/format-date';

type RouteParams = {
  article: NewsArticle;
};

export const NewsDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { article } = route.params as RouteParams;

  const handleOpenInBrowser = async () => {
    if (article.url) {
      try {
        await Linking.openURL(article.url);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <NewsImage url={article.urlToImage} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.meta}>
          {article.author && (
            <Text style={styles.author}>Автор: {article.author}</Text>
          )}
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          <Text style={styles.source}>Источник: {article.source.name}</Text>
        </View>

        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}

        {article.content && (
          <Text style={styles.contentText}>{article.content}</Text>
        )}

        {article.url && (
          <TouchableOpacity style={styles.button} onPress={handleOpenInBrowser}>
            <Text style={styles.buttonText}>Открыть в браузере</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  meta: {
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333',
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
