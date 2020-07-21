import {
  createSlice,
  PayloadAction,
  combineReducers,
  createSelector,
} from '@reduxjs/toolkit';
import config from '@app/config';
import isEmpty from 'lodash/isEmpty';
import { createListSlice } from '@app/store/factories/sliceFactory';
import { RootState } from '@app/store/configureStore';
import { NormalizedState, Anime, AnimeResponse } from '@app/ts/types';

type State = NormalizedState<Anime>;

const {
  headers,
  endpoints: { getAnimeList },
} = config.api;

const initialState: State = {
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
    add: (data, action: PayloadAction<AnimeResponse>) => {
      data.byId = { ...data.byId, ...action.payload.anime };
      data.allIds = [
        ...new Set([...data.allIds, ...Object.keys(action.payload.anime)]),
      ];
    },
    remove: (data, action: PayloadAction<string>) => {
      delete data.byId[action.payload];
      data.allIds = data.allIds.filter((id) => id !== action.payload);
    },
  },
});

// Reducer composition pattern
const mostPopularSlice = createListSlice(`${slice.name}/mostPopular`);
const highestRatedSlice = createListSlice(`${slice.name}/highestRated`);

// Private(ish) action creators
const { add } = slice.actions;

// Public action creators
export const fetchMostPopular = (
  { limit, offset } = { limit: 10, offset: 0 }
) =>
  mostPopularSlice.actions.request({
    headers,
    url: getAnimeList.paginate({ limit, offset }).sort(['popularityRank']).path,
    onSuccess: add.type,
  });
export const fetchHighestRated = (
  { limit, offset } = { limit: 10, offset: 0 }
) =>
  highestRatedSlice.actions.request({
    headers,
    url: getAnimeList.paginate({ limit, offset }).sort(['ratingRank']).path,
    onSuccess: add.type,
  });

// Selectors
export const getAllIds = (state: RootState) => state.entities.anime.data.allIds;
export const getNormalizedList = (state: RootState) =>
  state.entities.anime.data.byId || {};
export const getHighestRatedIds = (state: RootState) =>
  state.entities.anime.lists.highestRated.ids;
export const getMostPopularIds = (state: RootState) =>
  state.entities.anime.lists.mostPopular.ids;
export const getAll = createSelector(
  getNormalizedList,
  getAllIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);
export const getHighestRated = createSelector(
  getNormalizedList,
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
export const getMostPopular = createSelector(
  getNormalizedList,
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

// Reducer
export default combineReducers({
  data: slice.reducer,
  lists: combineReducers({
    highestRated: highestRatedSlice.reducer,
    mostPopular: mostPopularSlice.reducer,
  }),
});
