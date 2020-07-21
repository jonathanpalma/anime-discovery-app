import { combineReducers } from '@reduxjs/toolkit';
import anime from '@app/store/slices/anime';

const entities = combineReducers({ anime });

export default combineReducers({ entities });
