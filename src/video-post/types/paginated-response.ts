export type PaginatedResponse<T> = {
  results: T[];
  nextCursor: string;
};
