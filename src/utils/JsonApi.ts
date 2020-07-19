type Filter = {
  attribute: string;
  value: string | number;
};
type Pagination = {
  limit: number;
  offset: number;
};
type Field = {
  entity: string;
  fields: string[];
};

// DISCLAIMER: I created this utility using Kitsu API docs, it
// hasn't been tested with any other API following the JSON API spec.
// Maybe I will Open Source this later on...

const getPathOperator = (path: string) => (path.includes('?') ? '&' : '?');

export const field = (path: string) => (fields: Field[]) => {
  const operator = getPathOperator(path);
  const params = fields
    .map((f) => `fields[${f.entity}]=${f.fields.join(',')}`)
    .join('&');
  const newPath = `${path}${operator}${params}`;
  return createJsonApiResource(newPath);
};

export const filter = (path: string) => (filters: Filter[]) => {
  const operator = getPathOperator(path);
  const params = filters
    .map((f) => `filter[${f.attribute}]=${f.value}`)
    .join('&');
  const newPath = `${path}${operator}${params}`;
  return createJsonApiResource(newPath);
};

export const include = (path: string) => (relationships: string[]) => {
  const operator = getPathOperator(path);
  const params = `include=${relationships.join(',')}`;
  const newPath = !path.includes('include=')
    ? `${path}${operator}${params}`
    : path.replace(/include=\D+/g, params);
  return createJsonApiResource(newPath);
};

export const paginate = (path: string) => ({
  limit = 10,
  offset = 0,
}: Pagination) => {
  const operator = getPathOperator(path);
  const params = `page[limit]=${limit}&page[offset]=${offset}`;
  const newPath = !path.includes('page[limit]=')
    ? `${path}${operator}${params}`
    : path
        .replace(/page\[limit\]=\d+/g, `page[limit]=${limit}`)
        .replace(/page\[offset\]=\d+/g, `page[offset]=${offset}`);
  return createJsonApiResource(newPath);
};

export const sort = (path: string) => (attributes: string[]) => {
  const operator = getPathOperator(path);
  const params = `sort=${attributes.join(',')}`;
  const newPath = !path.includes('sort=')
    ? `${path}${operator}${params}`
    : path.replace(/sort=\d+/g, params);
  return createJsonApiResource(newPath);
};

export const createJsonApiResource = (path: string) => ({
  path,
  field: field(path),
  filter: filter(path),
  include: include(path),
  paginate: paginate(path),
  sort: sort(path),
});
