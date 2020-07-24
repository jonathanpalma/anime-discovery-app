import { combineReducers } from '@reduxjs/toolkit';
import entities from '@app/store/slices/entities';
import lists from '@app/store/slices/lists';

export default combineReducers({ entities, lists });
