import { HTMLAttributes } from 'react';

export type ViewPort<T> = {
  desktop?: T;
  tablet?: T;
  mobile?: T;
};

export type SpaceType = Pick<
  NonNullable<HTMLAttributes<HTMLDivElement>['style']>,
  | 'marginTop'
  | 'marginLeft'
  | 'paddingTop'
  | 'marginRight'
  | 'paddingLeft'
  | 'marginBottom'
  | 'paddingRight'
  | 'paddingBottom'
>;
