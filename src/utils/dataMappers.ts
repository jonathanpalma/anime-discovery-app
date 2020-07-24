/* eslint-disable import/prefer-default-export */
import { CardItem, NormalizedAnime } from '@app/ts/types';

export const mapAnimeToCard = (anime: NormalizedAnime): CardItem => ({
  id: anime.id,
  image: anime.attributes.posterImage.small,
  title: anime.attributes.canonicalTitle,
});
