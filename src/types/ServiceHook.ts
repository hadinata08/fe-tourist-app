export type ServiceHook<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  A = undefined,
  R1 = Promise<void>,
  R2 = Promise<void>,
  R3 = void
> = T & {
  handleFetch: (arg: A) => R1;
  refetch: () => R2;
  onEndReachedHandler?: (arg?: A) => R3;
  handleReset?: () => R1;
};
