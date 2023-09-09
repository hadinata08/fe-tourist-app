export type ApiListResponse<T> = {
  data: T;
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
  hasMore: boolean;
};
