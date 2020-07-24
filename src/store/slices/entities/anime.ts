import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/store/configureStore';
import {
  NormalizedState,
  NormalizedAnime,
  NormalizedAnimeDocument,
} from '@app/ts/types';

type State = NormalizedState<NormalizedAnime>;

const initialState: State = {
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
    add: (state, action: PayloadAction<NormalizedAnimeDocument>) => {
      state.byId = { ...state.byId, ...action.payload.anime };
      state.allIds = [
        ...new Set([...state.allIds, ...Object.keys(action.payload.anime)]),
      ];
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      // @ts-ignore
      (action) => action.type.endsWith('/animeRequestSuccess'),
      (state, action: PayloadAction<NormalizedAnimeDocument>) => {
        const shallowCopy = { ...action.payload.anime };
        state.byId = { ...state.byId, ...shallowCopy };
        state.allIds = [
          ...new Set([...state.allIds, ...Object.keys(shallowCopy)]),
        ];
      }
    ),
});

// Public action creators
const { add } = slice.actions;
export { add as addAnime };

// Selectors
export const getAllIds = (state: RootState) => state.entities.anime.allIds;
export const getNormalizedAnimeList = (state: RootState) =>
  state.entities.anime.byId;
export const getAll = createSelector(
  getNormalizedAnimeList,
  getAllIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);

// Reducer
export default slice.reducer;
