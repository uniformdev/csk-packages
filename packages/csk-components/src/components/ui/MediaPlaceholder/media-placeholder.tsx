import { FC } from 'react';
import { MediaPlaceholderType } from '.';
import { ImageIcon, VideoIcon } from '../_icons';
import BaseText from '../Text';

export const MediaPlaceholder: FC<MediaPlaceholderType> = ({ type, placeholder }) => {
  const Icon = type === 'video' ? VideoIcon : ImageIcon;
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <Icon className="size-1/2 max-h-36 max-w-36" />
      {!!placeholder && (
        <BaseText className="text-center" weight="bold">
          {placeholder}
        </BaseText>
      )}
    </div>
  );
};
