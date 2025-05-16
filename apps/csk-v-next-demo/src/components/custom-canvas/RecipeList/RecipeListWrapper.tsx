import React from 'react';
import { DataWithProperties } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { getRecipesByCategory } from '@/utils/canvas/contentClient';
import RecipeList from '.';

type RecipeListWrapperParameters = {
  categories: DataWithProperties[];
};

type RecipeListWrapperProps = ComponentProps<RecipeListWrapperParameters, 'filters'>;

const RecipeListWrapper: React.FC<RecipeListWrapperProps> = async ({ context, component, slots, ...restProps }) => {
  const searchParams = context.searchParams;

  const recipesList = await getRecipesByCategory({ categoryId: searchParams?.category });

  return <RecipeList {...restProps} recipesList={recipesList} context={context} component={component} slots={slots} />;
};

export default RecipeListWrapper;
