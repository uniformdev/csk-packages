import React from 'react';
import { DataWithProperties } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import RecipeList from '.';

type RecipeListWrapperParameters = {
  categories?: DataWithProperties[];
};

enum RecipeListWrapperSlots {
  Filters = 'filters',
}

type RecipeListWrapperProps = ComponentProps<RecipeListWrapperParameters, RecipeListWrapperSlots>;

const RecipeListWrapper: React.FC<RecipeListWrapperProps> = async props => {
  // TODO: Add search params from context
  //const searchParams = '';

  // TODO: Add recipes list
  //const recipesList = await getRecipesByCategory({ categoryId: '' });

  // TODO: Add flatten parameters
  // return <RecipeList {...props} recipesList={recipesList} />;
  return <RecipeList {...props} />;
};

export default RecipeListWrapper;
