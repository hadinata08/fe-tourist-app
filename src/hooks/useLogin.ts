import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BFFServiceInstance } from "../config/axios";
import { ApiResponse } from "../types/ApiResponse";
import { ServiceHook } from "../types/ServiceHook";
import { ServiceHookProps } from "../types/ServiceHookProps";
import { LoginResponse } from "../types/LoginResponse";

export type loginPayload = {
  email: string;
  password: string;
};

type LoginState = {
  data?: AxiosResponse<ApiResponse<LoginResponse>>;
  params?: loginPayload;
  isLoading: boolean;
  error: unknown;
};

export type LoginHook = ServiceHook<
  LoginState,
  loginPayload,
  Promise<AxiosResponse<ApiResponse<LoginResponse>>>,
  Promise<AxiosResponse<ApiResponse<LoginResponse>>>
>;

type Props = ServiceHookProps<
  loginPayload,
  AxiosResponse<ApiResponse<LoginResponse>>
>;

export const useLogin = (props: Props): LoginHook => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<AxiosResponse<ApiResponse<LoginResponse>>>();

  const [params, setParams] = useState<loginPayload>();

  const [error, setError] = useState<unknown>();

  const handleFetch = useCallback(
    async (arg?: loginPayload) => {
      try {
        setIsLoading(true);
        const res: AxiosResponse<ApiResponse<LoginResponse>> =
          await BFFServiceInstance({
            method: "POST",
            url: "/api/authaccount/login",
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
