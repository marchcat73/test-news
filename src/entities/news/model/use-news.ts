import useSWRInfinite from 'swr/infinite';
import { NewsArticle, NewsParams, NewsResponse } from './news.types';
import { newsApi } from '../api/news.api';
import { PAGE_SIZE } from '../../../shared/config/constants';

export const useNews = (searchQuery?: string, category?: string) => {
  const getKey = (pageIndex: number, previousPageData: NewsResponse | null) => {
    if (previousPageData && !previousPageData.articles.length) return null;

    const params: NewsParams = {
      page: pageIndex + 1,
      pageSize: PAGE_SIZE,
    };

    if (searchQuery) params.q = searchQuery;
    if (category) params.category = category;

    return ['/top-headlines', params];
  };

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(
      getKey,
      ([, params]) => newsApi.getTopHeadlines(params as NewsParams),
      {
        revalidateFirstPage: false,
      },
    );

  const articles: NewsArticle[] = data
    ? data.flatMap(page => page.articles)
    : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.articles.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.articles.length < PAGE_SIZE);

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  const refresh = () => mutate();

  return {
    articles,
    error,
    isLoading,
    isValidating,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    refresh,
    mutate,
  };
};
