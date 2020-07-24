import isEmpty from 'lodash/isEmpty';
import { createSelector } from '@reduxjs/toolkit';
import { createAnimeListSlice } from '@app/store/factories/sliceFactory';
import { getNormalizedAnimeList } from '@app/store/slices/entities/anime';
import { RootState } from '@app/store/configureStore';
import config from '@app/config';

const slice = createAnimeListSlice('mostPopular');

// Public actions
const { animeRequestSuccess, request } = slice.actions;
export { animeRequestSuccess as mostPopularAnimeSuccess };
export const fetchMostPopularAnime = ({ limit = 10, offset = 0 } = {}) =>
  request(
    config.api.endpoints.getAnimeList
      .paginate({ limit, offset })
      .sort(['popularityRank']).path
  );

// Selectors
const getMostPopularState = (state: RootState) => state.lists.anime.mostPopular;
const getMostPopularIds = (state: RootState) => getMostPopularState(state).ids;
const getMostPopularList = createSelector(
  getNormalizedAnimeList,
  getMostPopularIds,
  (byId, ids) =>
    isEmpty(byId)
      ? []
      : [...ids]
          .filter((id) => byId[id])
          .sort((a, b) =>
            byId[a].attributes.popularityRank >
            byId[b].attributes.popularityRank
              ? 1
              : -1
          )
          .map((id) => byId[id])
);
export const getMostPopularAnime = createSelector(
  getMostPopularState,
  getMostPopularList,
  ({ error, isLoading }, list) => ({
    error,
    isLoading,
    list,
  })
);

// Reducer
export default slice.reducer;
