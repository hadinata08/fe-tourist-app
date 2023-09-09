// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = {
  data: T;
  page: string | number;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  $id: string;
  createdat: Date;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
};
