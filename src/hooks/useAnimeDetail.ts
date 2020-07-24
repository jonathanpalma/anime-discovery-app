import axios from 'axios';
import { useQuery } from 'react-query';
import config from '@app/config';
// @ts-ignore
import normalize from 'json-api-normalizer';
import { JsonApiDocument, NormalizedAnimeDetailDocument } from '@app/ts/types';

const { baseURL, headers, endpoints } = config.api;
function useAnimeDetail(id: string) {
  return useQuery('animeDetail', async () => {
    const response = await axios.get<JsonApiDocument>(
      `${baseURL}${endpoints.getAnimeById(id).path}`,
      { headers }
    );
    if (response.headers['content-type'] === 'application/vnd.api+json') {
      const normalizedData: NormalizedAnimeDetailDocument = normalize(
        response.data
      );
      return normalizedData.anime[id];
    }
    return null;
  });
}

export default useAnimeDetail;
