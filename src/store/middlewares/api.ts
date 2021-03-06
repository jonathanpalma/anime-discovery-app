import axios from 'axios';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { batchActions } from 'redux-batched-actions';
// @ts-ignore
import normalize from 'json-api-normalizer';
import * as actions from '@app/store/slices/api';
import { ApiAction, isStrings, ActionCallback } from '@app/ts/types';

type Options = {
  baseURL: string;
};

// Why curriying and not just a single function with two args?
// Ans: I would prefer to keep a way to separate ActionCreator and Action
// in order to be consistent with {createAction} from '@reduxjs/toolkit'
export const createActionCallback = (type: string) => (
  shouldForwardPayload: boolean
): ActionCallback => ({
  type,
  shouldForwardPayload,
});

export default function createApiMiddleware(options: Options) {
  const api: Middleware = ({ dispatch }) => (next) => async (
    action: PayloadAction<ApiAction>
  ) => {
    if (action.type !== actions.apiRequestBegan.type) {
      next(action);
      return;
    }
    const {
      data,
      headers,
      method = 'GET',
      onError,
      onStart,
      onSuccess,
      url,
    } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }
    next(action);

    try {
      console.log(`Sending server request to server ${options.baseURL}${url}`);
      const response = await axios.request({
        baseURL: options.baseURL,
        data,
        headers,
        method,
        url,
      });
      if (response.headers['content-type'] === 'application/vnd.api+json') {
        response.data = normalize(response.data);
      }
      dispatch(actions.apiRequestSuccess(response.data));
      if (onSuccess) {
        const payload = response.data;
        if (Array.isArray(onSuccess)) {
          if (isStrings(onSuccess)) {
            dispatch(
              batchActions(onSuccess.map((type) => ({ type, payload })))
            );
          } else {
            dispatch(
              batchActions(
                onSuccess.map(({ type, shouldForwardPayload = false }) =>
                  shouldForwardPayload
                    ? {
                        type,
                      }
                    : {
                        type,
                        payload,
                      }
                )
              )
            );
          }
        } else if (typeof onSuccess === 'string') {
          dispatch({ type: onSuccess, payload });
        } else {
          const { type, shouldForwardPayload = false } = onSuccess;
          dispatch(
            shouldForwardPayload
              ? {
                  type,
                  payload,
                }
              : { type }
          );
        }
      }
    } catch (err) {
      dispatch(actions.apiRequestFailed(err.message));
      if (onError) {
        dispatch({
          type: onError,
          payload: { message: err.message, statusCode: err.response.status },
        });
      }
    }
  };

  return api;
}
