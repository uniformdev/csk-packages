import React, { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import RecipeCard from '@/components/custom-ui/RecipeCard';

export interface RecipeItem {
  id: string;
  image: { url: string; title: string }[];
  title: string;
  description: string;
  slug: string;
}

export type RecipeListParameters = {
  recipesList: RecipeItem[];
};

type RecipeListProps = ComponentProps<RecipeListParameters, 'filters'>;

const RecipeList: FC<RecipeListProps> = ({ context, component, slots, recipesList }) => (
  <div className="grid gap-6 lg:grid-cols-12">
    <div className="grid lg:col-span-3 lg:col-start-1">
      <div className="h-full">
        <div className="flex flex-col lg:sticky lg:top-28">
          <UniformSlot context={context} data={component} slot={slots.filters} />
        </div>
      </div>
    </div>
    <div className={'relative grid gap-6 lg:col-span-9 lg:col-start-4 lg:grid-cols-2'}>
      {recipesList?.map(({ image, title, description, slug, id }) => (
        <RecipeCard key={id} image={image[0]} title={title} description={description} link={`recipes/${slug}`} />
      ))}
    </div>
  </div>
);

export default RecipeList;
