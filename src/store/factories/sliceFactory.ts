import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRequestBegan } from '@app/store/slices/api';
import {
  ApiError,
  NormalizedAnimeDocument,
  NormalizedMangaDocument,
} from '@app/ts/types';
import config from '@app/config';

type ListSliceState = {
  isLoading: boolean;
  error?: string;
  ids: string[];
};

const initialListState: ListSliceState = {
  isLoading: false,
  ids: [],
};

export function createAnimeListSlice(name: string) {
  const slice = createSlice({
    name: `anime/${name}`,
    initialState: initialListState,
    reducers: {
      clear: () => ({ ...initialListState }),
      animeRequestFailed: (state, action: PayloadAction<ApiError>) => {
        state.error = action.payload.message;
        state.isLoading = false;
      },
      animeRequestStarted: (state) => {
        delete state.error;
        state.isLoading = true;
      },
      animeRequestSuccess: (
        state,
        action: PayloadAction<NormalizedAnimeDocument>
      ) => {
        delete state.error;
        state.isLoading = false;
        state.ids = Object.keys(action.payload.anime);
      },
    },
  });
  const {
    animeRequestFailed,
    animeRequestStarted,
    animeRequestSuccess,
  } = slice.actions;

  const request = (url: string) =>
    apiRequestBegan({
      method: 'GET',
      headers: config.api.headers,
      url,
      onError: animeRequestFailed.type,
      onStart: animeRequestStarted.type,
      onSuccess: animeRequestSuccess.type,
    });

  return { ...slice, actions: { ...slice.actions, request } };
}

export function createMangaListSlice(name: string) {
  const slice = createSlice({
    name,
    initialState: initialListState,
    reducers: {
      clear: () => ({ ...initialListState }),
      mangaRequestFailed: (state, action: PayloadAction<ApiError>) => {
        state.error = action.payload.message;
        state.isLoading = false;
      },
      mangaRequestStarted: (state) => {
        delete state.error;
        state.isLoading = true;
      },
      mangaRequestSuccess: (
        state,
        action: PayloadAction<NormalizedMangaDocument>
      ) => {
        delete state.error;
        state.isLoading = false;
        state.ids = Object.keys(action.payload.manga);
      },
    },
  });
  const {
    mangaRequestFailed,
    mangaRequestStarted,
    mangaRequestSuccess,
  } = slice.actions;

  const request = (url: string) =>
    apiRequestBegan({
      method: 'GET',
      headers: config.api.headers,
      url,
      onError: mangaRequestFailed.type,
      onStart: mangaRequestStarted.type,
      onSuccess: mangaRequestSuccess.type,
    });

  return { ...slice, actions: { ...slice.actions, request } };
}
