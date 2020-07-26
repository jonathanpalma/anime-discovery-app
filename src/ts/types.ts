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
  canonicalTitle: string;
  endDate: string;
  episodeCount: number;
  popularityRank: number;
  posterImage: Image;
  ratingRank: number;
  status: Status;
  showType: AnimeType;
  subtype: AnimeType;
  startDate: string;
};
export type AnimeDetail = Anime & {
  coverImage: Image;
  synopsis: string;
  favoritesCount: number;
  userCount: number;
  youtubeVideoId: string;
  episodeLength: number;
  totalLength: number;
};
export type Manga = {
  canonicalTitle: string;
  endDate: string;
  episodeCount: number;
  popularityRank: number;
  posterImage: Image;
  ratingRank: number;
  status: Status;
  showType: MangaType;
  subtype: MangaType;
  startDate: string;
};
export type CardItem = {
  id: string;
  title: string;
  image: string;
};
export type CardCallback = {
  id: string;
  imageId: string;
};

// entities
export type NormalizedState<T> = {
  byId: { [key: string]: T };
  allIds: string[];
  selectedId?: string;
};
export type NormalizedAnime = NormalizedJsonApiResource<Anime>;
export type NormalizedAnimeDetail = NormalizedJsonApiResource<AnimeDetail>;
export type NormalizedAnimeDocument = NormalizedJsonApiDocument<
  NormalizedAnime,
  'anime'
>;
export type NormalizedAnimeDetailDocument = NormalizedJsonApiDocument<
  NormalizedAnimeDetail,
  'anime'
>;
export type NormalizedManga = NormalizedJsonApiResource<Manga>;
export type NormalizedMangaDocument = NormalizedJsonApiDocument<
  NormalizedManga,
  'manga'
>;

// ts-json-api
export type JsonApi = {
  version: string;
};
export type JsonApiMeta = {
  [key: string]: string | string[] | number | number[];
};
export type JsonApiLinkMeta = {
  href: string;
  meta: JsonApiMeta;
};
export type JsonApiLink = {
  self: string;
  related?: string | JsonApiLinkMeta;
};
export type JsonApiPaginationLink = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};
export type JsonApiResourceIdentifier = {
  id: string;
  type: string;
  meta?: JsonApiMeta;
};
export type JsonApiResourceAttribute = any | any[];
export type JsonApiResourceLinkage =
  | null // empty to-one relationships.
  | [] // empty to-many relationships.
  | JsonApiResourceIdentifier // non-empty to-one relationships.
  | JsonApiResourceIdentifier[]; // non-empty to-many relationships.
export type JsonApiRelationship = {
  links?: JsonApiLink;
  data?: JsonApiResourceLinkage;
  meta?: JsonApiMeta;
};
export type JsonApiResource = JsonApiResourceIdentifier & {
  attributes?: { [key: string]: JsonApiResourceAttribute };
  relationships?: { [key: string]: JsonApiRelationship };
  links?: JsonApiLink;
};
export type JsonApiErrorSource = {
  pointer?: string;
  parameter?: string;
};
export type JsonApiError = {
  id?: string;
  type?: string;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: JsonApiErrorSource;
};
type JsonApiDocumentBase = {
  // document MAY contain any of these top-level members:
  jsonapi?: JsonApi;
  links?: Partial<JsonApiLink> & Partial<JsonApiPaginationLink>;
  included?: JsonApiResource[]; // if 'data' is not present, 'included' MUST NOT be included.
};
export type JsonApiDocument =
  // document MUST contain at least one of the following top-level members: data, errors, meta
  | (JsonApiDocumentBase & {
      // data and errors MUST NOT coexist in the same document.
      data: null | JsonApiResource | JsonApiResource[];
      meta?: JsonApiMeta;
    })
  | (JsonApiDocumentBase & {
      // data and errors MUST NOT coexist in the same document.
      errors: JsonApiError[];
      meta?: JsonApiMeta;
    })
  | (JsonApiDocumentBase & {
      errors?: JsonApiError[];
      meta: JsonApiMeta;
    })
  | (JsonApiDocumentBase & {
      data?: null | JsonApiResource | JsonApiResource[];
      meta: JsonApiMeta;
    });

// json-api-normalizer
export type NormalizedJsonApiDocument<T, K extends string> = {
  [type in K]: { [key: string]: T };
};
export type NormalizedJsonApiResource<T> = {
  id: string;
  attributes: T;
  relationships: { [key: string]: JsonApiRelationship };
};

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
  url: string;
};

// type guards
export function isStrings(
  array: string[] | ActionCallback[]
): array is string[] {
  return typeof array[0] === 'string';
}
const animeTypes = ['ONA', 'OVA', 'TV', 'movie', 'music', 'special'];
export function isAnime(resource: Anime | Manga): resource is Anime {
  return animeTypes.includes(resource.showType);
}
const mangaTypes = [
  'doujin',
  'manga',
  'manhua',
  'manhwa',
  'novel',
  'oel',
  'oneshot',
];
export function isManga(resource: Anime | Manga): resource is Manga {
  return mangaTypes.includes(resource.showType);
}
