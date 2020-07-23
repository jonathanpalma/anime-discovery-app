/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRequestBegan } from '@app/store/slices/api';
import { ApiError, AnimeResponse } from '@app/ts/types';

type ListSliceState = {
  isLoading: boolean;
  error?: string;
  ids: string[];
};
type RequestAction = {
  headers: { [key: string]: string };
  url: string;
  onSuccess: string;
};

export function createListSlice(name: string) {
  const initialState: ListSliceState = {
    isLoading: false,
    ids: [],
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clear: () => ({ ...initialState }),
      requestFailed: (state, action: PayloadAction<ApiError>) => {
        state.error = action.payload.message;
        state.isLoading = false;
      },
      requestStarted: (state) => {
        delete state.error;
        state.isLoading = true;
      },
      requestSuccess: (state, action: PayloadAction<AnimeResponse>) => {
        delete state.error;
        state.ids = Object.keys(action.payload.anime);
        state.isLoading = false;
      },
    },
  });
  const { requestFailed, requestStarted, requestSuccess } = slice.actions;

  const request = ({ headers, onSuccess, url }: RequestAction) =>
    apiRequestBegan({
      method: 'GET',
      headers,
      url,
      onError: requestFailed.type,
      onStart: requestStarted.type,
      onSuccess: [onSuccess, requestSuccess.type],
    });

  return { ...slice, actions: { ...slice.actions, request } };
}
