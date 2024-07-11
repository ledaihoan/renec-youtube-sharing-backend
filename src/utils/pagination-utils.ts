import { PaginatedResponse } from '../video-post/types/paginated-response';

export const parsePaginationCursor = <T>(cursor: string): T => {
  const originStr = Buffer.from(cursor, 'base64').toString();
  return JSON.parse(originStr) as T;
};

export const encodePaginationCursor = <
  T extends { [key: string]: any },
  K extends keyof T,
>(
  lastElement: T,
  key: K,
): string => {
  const paginationParams = { [key]: lastElement[key] };
  return Buffer.from(JSON.stringify(paginationParams)).toString('base64');
};

export const buildPaginatedResponse = <
  T extends { [key: string]: any },
  K extends keyof T,
>(
  array: T[],
  key: K,
  limit: number,
): PaginatedResponse<T> => {
  return {
    results: array.slice(0, limit),
    nextCursor:
      array.length === limit + 1
        ? encodePaginationCursor(array[limit], key)
        : null,
  };
};
