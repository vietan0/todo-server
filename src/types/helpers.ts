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
export type ExtractPrimitives<T> = {
  [K in keyof T as T[K] extends Primitive ? K : never]: T[K];
};
// NonNever borrowed from ts-essentials - https://github.com/ts-essentials/ts-essentials/tree/master/lib/non-never
export declare type NonNever<Type extends {}> = Pick<
  Type,
  {
    [Key in keyof Type]: Type[Key] extends never ? never : Key;
  }[keyof Type]
>;
export type PickRequired<T> = {
  [K in keyof T as Omit<T, K> extends T ? never : K]: T[K];
};
