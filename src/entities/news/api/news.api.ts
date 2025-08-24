import { httpClient } from '../../../shared/api/http-client';
import { NewsResponse, NewsParams } from '../model/news.types';

export const newsApi = {
  getTopHeadlines: (params: NewsParams): Promise<NewsResponse> => {
    const queryParams: Record<string, string> = {
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
    };

    if (params.q) queryParams.q = params.q;
    if (params.category) queryParams.category = params.category;
    queryParams.country = 'us';

    return httpClient
      .get('/top-headlines', { params: queryParams })
      .then(res => res.data);
  },
};
