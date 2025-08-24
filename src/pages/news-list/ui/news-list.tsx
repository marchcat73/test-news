import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NewsArticle } from '../../../entities/news/model/news.types';
import { useNews } from '../../../entities/news/model/use-news';
import { NewsCard } from '../../../widgets/news-card/ui/news-card';
import { SearchBar } from './search-bar';
import { CategoryFilter } from './category-filter';
import { Loader } from '../../../shared/ui/loader/loader';
import { Error } from '../../../shared/ui/error/error';

type RootStackParamList = {
  NewsDetailScreen: { article: NewsArticle };
};

export const NewsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const {
    articles,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    refresh,
    loadMore,
  } = useNews(searchQuery, selectedCategory);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectCategory = (category: string | undefined) => {
    setSelectedCategory(category);
  };

  const handlePressArticle = useCallback(
    (article: NewsArticle) => {
      if (article) {
        navigation.navigate('NewsDetailScreen', { article });
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => (
      <NewsCard article={item} onPress={handlePressArticle} />
    ),
    [handlePressArticle],
  );

  const renderFooter = () => {
    if (isLoadingMore) return <Loader />;
    if (isReachingEnd) return null;
    return null;
  };

  if (isLoading && !articles?.length) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Ошибка загрузки новостей" onRetry={refresh} />;
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <View style={styles.listBox}>
        {articles && (
          <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item?.url}-${index}`}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            }
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listBox: {
    marginTop: 2,
    flex: 1,
  },
  list: {
    paddingBottom: 16,
  },
});
