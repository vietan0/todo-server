/* eslint-disable @typescript-eslint/ban-types */

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined
  | Date;
export type PickPrimitive<T> = {
  [K in keyof T as T[K] extends Primitive ? K : never]: T[K];
};
// NonNever borrowed from ts-essentials - https://github.com/ts-essentials/ts-essentials/tree/master/lib/non-never
export declare type NonNever<T extends {}> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K;
  }[keyof T]
>;
export type PickRequired<T> = {
  [K in keyof T as Omit<T, K> extends T ? never : K]: T[K];
};
export type ExtractPrimitive<T> = {
  [K in keyof T]: Extract<T[K], Primitive>;
};
