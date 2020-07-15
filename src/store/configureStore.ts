import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import reducer from '@app/store/reducer';

const middleware = [...getDefaultMiddleware()];
const store = configureStore({
  reducer,
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
