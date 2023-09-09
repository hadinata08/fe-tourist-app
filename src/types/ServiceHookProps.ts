// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceHookProps<P = undefined, R = any, E = unknown> = {
  enabled?: boolean;
  retry?: boolean | number;
  retryDelay?: number;
  params?: P;
  onSuccess?: (data: R) => void;
  onError?: (error: E) => void;
};
