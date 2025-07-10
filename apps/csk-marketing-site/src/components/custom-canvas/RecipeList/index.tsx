import React, { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import RecipeCard from '@/components/custom-ui/RecipeCard';
import { getRecipesByCategory } from '@/utils/canvas/contentClient';

export interface RecipeItem {
  id: string;
  image: { url: string; title: string }[];
  title: string;
  description: string;
  slug: string;
}

export type RecipeListAdditionalParameters = {
  recipesList?: RecipeItem[];
};

export type RecipeListParameters = unknown;

enum RecipeListSlots {
  Filters = 'filters',
}

type RecipeListProps = ComponentProps<RecipeListParameters, RecipeListSlots> & RecipeListAdditionalParameters;

const RecipeList: FC<RecipeListProps & RecipeListParameters> = async ({ slots, context }) => {
  const categoryId = context.pageState.keys?.category;
  const recipesList = await getRecipesByCategory({ categoryId });

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="grid lg:col-span-3 lg:col-start-1">
        <div className="h-full">
          <div className="flex flex-col lg:sticky lg:top-28">
            <UniformSlot slot={slots.filters} />
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
};

export default withFlattenParameters(RecipeList);
