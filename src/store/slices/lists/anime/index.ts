import { combineReducers } from '@reduxjs/toolkit';
import highestRated from './highestRatedAnime';
import mostPopular from './mostPopularAnime';

export default combineReducers({
  highestRated,
  mostPopular,
});
