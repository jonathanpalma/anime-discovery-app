import { AxiosTransformer } from 'axios';

type AnimeType = 'ONA' | 'OVA' | 'TV' | 'movie' | 'music' | 'special';
type MangaType =
  | 'doujin'
  | 'manga'
  | 'manhua'
  | 'manhwa'
  | 'novel'
  | 'oel'
  | 'oneshot';
type Status = 'current' | 'finished' | 'tba' | 'unreleased' | 'upcoming';
type Image = {
  tiny: string;
  small: string;
  large: string;
  original: string;
  meta: {
    dimensions: {
      tiny: { width: number; height: number };
      small: { width: number; height: number };
      large: { width: number; height: number };
    };
  };
};
export type Anime = {
  id: string;
  attributes: {
    canonicalTitle: string;
    endDate: string;
    episodeCount: number;
    popularityRank: number;
    coverImage: Image;
    ratingRank: number;
    status: Status;
    showType: AnimeType;
    subtype: AnimeType;
    startDate: string;
  };
  relationships: { [key: string]: JsonApiRelationship };
};
export type Manga = {
  id: string;
  attributes: {
    canonicalTitle: string;
    endDate: string;
    episodeCount: number;
    popularityRank: number;
    coverImage: Image;
    ratingRank: number;
    status: Status;
    showType: MangaType;
    subtype: MangaType;
    startDate: string;
  };
  relationships: { [key: string]: JsonApiRelationship };
};
export type CardItem = {
  id: string;
  title: string;
  image: string;
};

// json api
export type JsonApiLink = {
  self: string;
  related?: string;
};
export type JsonApiRelationship = { links: JsonApiLink };

// redux
export type ActionCallback = {
  type: string;
  shouldForwardPayload: boolean;
};
export type ApiError = {
  message: string;
  statusCode: number;
};
export type ApiAction = {
  data?: any;
  headers?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  onError?: string;
  onStart?: string;
  onSuccess?: string | string[] | ActionCallback | ActionCallback[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  url: string;
};
export type NormalizedState<T> = {
  byId: { [key: string]: T };
  allIds: string[];
};

// type guards
export function isStrings(
  array: string[] | ActionCallback[]
): array is string[] {
  return typeof array[0] === 'string';
}
