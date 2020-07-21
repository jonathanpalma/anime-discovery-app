import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import { createLogger } from 'redux-logger';
import createApiMiddleware from '@app/store/middlewares/api';
import reducer from '@app/store/reducer';
import config from '@app/config';

const apiMiddleware = createApiMiddleware({
  baseURL: config.api.baseURL,
});

const middleware = [
  ...getDefaultMiddleware(),
  batchDispatchMiddleware,
  apiMiddleware,
];

if (__DEV__) {
  middleware.push(createLogger());
}

const store = configureStore({
  reducer: enableBatching(reducer),
  middleware,
});

export default function () {
  return store;
}

export type RootState = ReturnType<typeof reducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
