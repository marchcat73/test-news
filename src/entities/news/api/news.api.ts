import { NewsResponse, NewsParams } from '../model/news.types';
import { httpClient } from '../../../shared/api/http-client';

export const newsApi = {
  getTopHeadlines: (params: NewsParams): Promise<NewsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.q) queryParams.append('q', params.q);
    if (params.category) queryParams.append('category', params.category);
    queryParams.append('page', params.page.toString());
    queryParams.append('pageSize', params.pageSize.toString());

    return httpClient
      .get(`/top-headlines?${queryParams}`)
      .then(res => res.data);
  },
};
