import isEmpty from 'lodash/isEmpty';
import { createSelector } from '@reduxjs/toolkit';
import { createAnimeListSlice } from '@app/store/factories/sliceFactory';
import { getNormalizedAnimeList } from '@app/store/slices/entities/anime';
import { RootState } from '@app/store/configureStore';
import config from '@app/config';

const slice = createAnimeListSlice('highestRated');

// Public actions
const { animeRequestSuccess, request } = slice.actions;
export { animeRequestSuccess as highestRatedAnimeSuccess };
export const fetchHighestRatedAnime = ({ limit = 10, offset = 0 } = {}) =>
  request(
    config.api.endpoints.getAnimeList
      .paginate({ limit, offset })
      .sort(['ratingRank']).path
  );

// Selectors
const getHighestRatedState = (state: RootState) =>
  state.lists.anime.highestRated;
const getHighestRatedIds = (state: RootState) =>
  getHighestRatedState(state).ids;
const getHighestRatedList = createSelector(
  getNormalizedAnimeList,
  getHighestRatedIds,
  (byId, ids) =>
    isEmpty(byId)
      ? []
      : [...ids]
          .filter((id) => byId[id])
          .sort((a, b) =>
            byId[a].attributes.ratingRank > byId[b].attributes.ratingRank
              ? 1
              : -1
          )
          .map((id) => byId[id])
);
export const getHighestRatedAnime = createSelector(
  getHighestRatedState,
  getHighestRatedList,
  ({ error, isLoading }, list) => ({
    error,
    isLoading,
    list,
  })
);

// Reducer
export default slice.reducer;
