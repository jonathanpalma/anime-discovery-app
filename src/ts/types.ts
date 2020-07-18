// Item can be either an Anime or Manga
export type Item = {
  slug: string;
  title: string;
  image: string;
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
