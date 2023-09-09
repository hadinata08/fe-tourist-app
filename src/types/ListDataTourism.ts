import { DataTourisms } from "./DataTourims";

export type ListDataTourism = {
  page: string | number;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: DataTourisms[] | undefined;
};
