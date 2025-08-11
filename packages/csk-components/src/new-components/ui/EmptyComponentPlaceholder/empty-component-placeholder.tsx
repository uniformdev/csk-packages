import { FC } from 'react';
import { EmptyComponentPlaceholderType } from '.';

export const EmptyComponentPlaceholder: FC<EmptyComponentPlaceholderType> = () => {
  return <div className="h-20 w-full" />;
};
