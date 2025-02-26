'use client';

import { FC, useState } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Container, ContainerProps, Image } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { cn } from '@uniformdev/csk-components/utils/styling';

type IconSize = keyof DefaultTheme['fontSize'];

export type AddToFavoritesParameters = {
  addIcon?: Asset[];
  removeIcon?: Asset[];
  size?: IconSize;
  position: 'block' | 'top-right';
  spacing?: ContainerProps['spacing'];
  backgroundColor?: ContainerProps['backgroundColor'];
};
enum SectionSlots {
  Content = 'content',
}

type AddToFavoritesProps = ComponentProps<AddToFavoritesParameters, SectionSlots>;

const AddToFavorites: FC<AddToFavoritesProps> = ({ addIcon, removeIcon, size, position, spacing, backgroundColor }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const [resolvedAddIcon] = resolveAsset(addIcon);
  const [resolvedRemoveIcon] = resolveAsset(removeIcon);

  const iconToRender = isInFavorites ? resolvedRemoveIcon : resolvedAddIcon;

  const label = isInFavorites ? 'Remove from favorites' : 'Add to favorites';

  const toggleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsInFavorites(prev => !prev);
  };

  return (
    <Container
      fluidContent
      spacing={spacing}
      backgroundColor={backgroundColor}
      className={cn('flex justify-center items-center', {
        [`text-${size}`]: !!size,
        'absolute top-0 right-0': position === 'top-right',
      })}
    >
      <button aria-label={label} className="relative size-[1em]" onClick={toggleFavorites}>
        <Image src={iconToRender.url} fill alt={label} />
      </button>
    </Container>
  );
};

export default AddToFavorites;
