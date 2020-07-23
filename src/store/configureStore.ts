import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import createApiMiddleware from '@app/store/middlewares/api';
import reducer from '@app/store/reducer';
import config from '@app/config';

export function getPersistConfig() {
  return {
    key: 'root',
    storage: AsyncStorage,
  };
}

const apiMiddleware = createApiMiddleware({
  baseURL: config.api.baseURL,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false, // because of redux-persist ಠ_ಠ
  }),
  batchDispatchMiddleware,
  apiMiddleware,
];

if (__DEV__) {
  middleware.push(createLogger());
}

const store = configureStore({
  reducer: persistReducer(getPersistConfig(), enableBatching(reducer)),
  middleware,
});

export const persistor = persistStore(store);

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
