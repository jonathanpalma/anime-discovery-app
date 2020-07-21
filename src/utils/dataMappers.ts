/* eslint-disable import/prefer-default-export */
import { Anime, CardItem } from '@app/ts/types';

export const mapAnimeToCard = (anime: Anime): CardItem => ({
  id: anime.id,
  image: anime.attributes.posterImage.small,
  title: anime.attributes.canonicalTitle,
});
