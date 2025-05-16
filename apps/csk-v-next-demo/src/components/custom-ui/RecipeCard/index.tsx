import React, { FC } from 'react';
import Link from 'next/link';
import { Image } from '@uniformdev/csk-components/components/ui';

export type RecipeCardParameters = {
  image: { url: string; title: string };
  title: string;
  description: string;
  link: string;
};

const RecipeCard: FC<RecipeCardParameters> = ({ image, title, description, link }) => {
  return (
    <Link
      href={link}
      className="[&:hover_h2]:underline [&:hover_img]:scale-[0.98] [&_h2]:transition-transform [&_img]:transition-transform"
    >
      <div className="aspect-video overflow-hidden">
        <Image sizes="100%" style={{ objectFit: 'cover' }} fill src={image.url} alt={image.title} />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <h2 className="text-2xl font-normal text-text-primary">{title}</h2>
        <p className="font-dm-sans text-base font-normal text-text-primary">{description}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
