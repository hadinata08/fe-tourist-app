import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BFFServiceInstance } from "../config/axios";
import { ApiResponse } from "../types/ApiResponse";
import { RegisterResponse } from "../types/RegisterResponse";
import { ServiceHook } from "../types/ServiceHook";
import { ServiceHookProps } from "../types/ServiceHookProps";

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

type RegisterState = {
  data?: AxiosResponse<ApiResponse<RegisterResponse>>;
  params?: RegisterPayload;
  isLoading: boolean;
  error: unknown;
};

export type RegisterHook = ServiceHook<
  RegisterState,
  RegisterPayload,
  Promise<AxiosResponse<ApiResponse<RegisterResponse>>>,
  Promise<AxiosResponse<ApiResponse<RegisterResponse>>>
>;

type Props = ServiceHookProps<
  RegisterPayload,
  AxiosResponse<ApiResponse<RegisterResponse>>
>;

export const useRegister = (props: Props): RegisterHook => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] =
    useState<AxiosResponse<ApiResponse<RegisterResponse>>>();

  const [params, setParams] = useState<RegisterPayload>();

  const [error, setError] = useState<unknown>();

  const handleFetch = useCallback(
    async (arg?: RegisterPayload) => {
      try {
        setIsLoading(true);
        const res: AxiosResponse<ApiResponse<RegisterResponse>> =
          await BFFServiceInstance({
            method: "POST",
            url: "/api/authaccount/registration",
            data: arg,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
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
