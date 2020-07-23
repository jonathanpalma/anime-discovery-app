import development from '@app/config/development';
import production from '@app/config/production';
import { createJsonApiResource } from '@app/utils/JsonApi';

// This should be set using env vars, but
// I'll keep it here because of time reasons
const BASE_URL = 'https://kitsu.io/api/edge';

const commons = {
  api: {
    baseURL: BASE_URL, // domain + base path (i.e. /api)
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
    endpoints: {
      getAnime: createJsonApiResource('/anime'),
      getAnimeById: (id: string) => ({
        path: `${createJsonApiResource('/anime').path}/${id}`,
      }),
      getAnimeList: createJsonApiResource('/anime')
        .field([
          {
            entity: 'anime',
            fields: [
              'canonicalTitle',
              'endDate',
              'episodeCount',
              'popularityRank',
              'posterImage',
              'ratingRank',
              'showType',
              'subtype',
              'startDate',
            ],
          },
        ])
        .paginate({ limit: 10, offset: 0 }),
      getManga: createJsonApiResource('/manga'),
    },
  },
};

const config = __DEV__ ? development(commons) : production(commons);

export type EnvCommons = typeof commons;
export type EnvConfig = typeof config;

export default Object.freeze(config);
