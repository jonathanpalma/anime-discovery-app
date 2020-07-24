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
    addAnime: (state, action: PayloadAction<NormalizedAnimeDocument>) => {
      state.byId = { ...state.byId, ...action.payload.anime };
      state.allIds = [
        ...new Set([...state.allIds, ...Object.keys(action.payload.anime)]),
      ];
    },
    removeAnime: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    selectAnime: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
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
export const { addAnime, selectAnime } = slice.actions;

// Selectors
const getAnimeState = (state: RootState) => state.entities.anime;
export const getAllIds = (state: RootState) => getAnimeState(state).allIds;
export const getNormalizedAnimeList = (state: RootState) =>
  getAnimeState(state).byId;
export const getSelectedId = (state: RootState) =>
  getAnimeState(state).selectedId || '';
export const getAll = createSelector(
  getNormalizedAnimeList,
  getAllIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);
export const getSelectedAnime = createSelector(
  getNormalizedAnimeList,
  getSelectedId,
  (byId, id) => byId[id]
);

// Reducer
export default slice.reducer;
