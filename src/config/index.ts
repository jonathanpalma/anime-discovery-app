import development from '@app/config/development';
import production from '@app/config/production';
import { createJsonApiResource } from '@app/utils/JsonApi';

// This should be set using env vars, but
// I'll keep it here because of time reasons
const BASE_URL = 'https://kitsu.io/api/edge';

const commons = {
  api: {
    baseURL: BASE_URL, // domain + base path (i.e. /api)
    endpoints: {
      getAnime: createJsonApiResource('anime'),
      getManga: createJsonApiResource('manga'),
    },
  },
};

const config = __DEV__ ? development(commons) : production(commons);

export type EnvCommons = typeof commons;
export type EnvConfig = typeof config;

export default Object.freeze(config);
