import { createAction } from '@reduxjs/toolkit';
import { ApiAction, ApiError } from '@app/ts/types';

export const apiRequestBegan = createAction<ApiAction>('api/requestBegan');
export const apiRequestSuccess = createAction<any>('api/requestSuccess');
export const apiRequestFailed = createAction<ApiError>('api/requestFailed');
