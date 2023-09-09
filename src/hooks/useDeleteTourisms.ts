import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BFFServiceInstance } from "../config/axios";
import { ApiResponse } from "../types/ApiResponse";
import { ServiceHook } from "../types/ServiceHook";
import { ServiceHookProps } from "../types/ServiceHookProps";
import { DataTourisms } from "../types/DataTourims";

export type EditTourismParams = {
  id?: string;
  token?: string;
  tourist_email?: string;
  tourist_location?: string;
  tourist_name?: string;
};

type DeleteTourismsState = {
  data?: AxiosResponse<ApiResponse<DataTourisms>>;
  params?: EditTourismParams;
  isLoading: boolean;
  error: unknown;
};

export type DeleteTourismsHook = ServiceHook<
  DeleteTourismsState,
  EditTourismParams,
  Promise<AxiosResponse<ApiResponse<DataTourisms>>>,
  Promise<AxiosResponse<ApiResponse<DataTourisms>>>
>;

type Props = ServiceHookProps<
  EditTourismParams,
  AxiosResponse<ApiResponse<DataTourisms>>
>;

export const useDeleteTourisms = (props: Props): DeleteTourismsHook => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<AxiosResponse<ApiResponse<DataTourisms>>>();

  const [params, setParams] = useState<EditTourismParams>();

  const [error, setError] = useState<unknown>();

  const handleFetch = useCallback(
    async (arg?: EditTourismParams) => {
      try {
        setIsLoading(true);
        const res: AxiosResponse<ApiResponse<DataTourisms>> =
          await BFFServiceInstance({
            method: "DELETE",
            url: `/api/Tourist/${arg?.id}`,
            data: arg,
            headers: {
              Authorization: `Bearer ${arg?.token}`,
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
