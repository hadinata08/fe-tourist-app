/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BFFServiceInstance } from "../config/axios";
import { ApiResponse } from "../types/ApiResponse";
import { ListDataTourism } from "../types/ListDataTourism";
import { ServiceHook } from "../types/ServiceHook";
import { ServiceHookProps } from "../types/ServiceHookProps";

export type GetTourismsListParams = {
  page: number;
  token?: string;
};

type GetTourismsState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: AxiosResponse<ApiResponse<ListDataTourism>>;
  params?: GetTourismsListParams;
  isLoading: boolean;
  error: unknown;
};

export type GetTourismsHook = ServiceHook<
  GetTourismsState,
  GetTourismsListParams,
  Promise<AxiosResponse<ApiResponse<ListDataTourism>>>,
  Promise<AxiosResponse<ApiResponse<ListDataTourism>>>
>;

type Props = ServiceHookProps<
  GetTourismsListParams,
  AxiosResponse<ApiResponse<ListDataTourism>>
>;

export const useGetTourisms = (props: Props): GetTourismsHook => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] =
    useState<AxiosResponse<ApiResponse<ListDataTourism>>>();

  const [params, setParams] = useState<GetTourismsListParams>();

  const [error, setError] = useState<unknown>();

  const handleFetch = useCallback(
    async (arg?: GetTourismsListParams) => {
      try {
        setIsLoading(true);
        const res: AxiosResponse<ApiResponse<ListDataTourism>> =
          await BFFServiceInstance({
            method: "GET",
            url: "/api/Tourist",
            data: arg,
            headers: {
              Authorization: `Bearer ${arg?.token}`,
            },
            params: {
              page: arg?.page,
            },
            transformRequest: [
              (data) => {
                const formData = new URLSearchParams();
                for (const key in data) {
                  formData.append(key, data[key]);
                }
                return formData.toString();
              },
            ],
          });

        setParams(arg);
        setIsLoading(false);
        setData(res);
        if (props.onSuccess) {
          props.onSuccess(res);
        }
        return res;
      } catch (error) {
        setIsLoading(false);
        setError(error);
        if (props.onError) {
          props.onError(error);
        }
        if (props.retry) {
          timeoutRef.current = setTimeout(() => {
            handleFetch(arg ? arg : props.params);
          }, props.retryDelay || 1000);
        }
        throw error;
      }
    },
    [props]
  );

  const refetch = useCallback(async () => {
    return await handleFetch();
  }, [handleFetch]);

  useEffect(() => {
    if (props.enabled && props.params) {
      handleFetch(props.params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.enabled]);

  return {
    data,
    params,
    error,
    isLoading,
    handleFetch,
    refetch,
  };
};
