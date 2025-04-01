import { FilterQuery } from '@/modules/search/types';

export const mergeFilterQueries = (filterQuery: FilterQuery, baseFilterQuery: FilterQuery): FilterQuery => {
  const mergedQuery: FilterQuery = { ...filterQuery };

  Object.entries(baseFilterQuery).forEach(([key, value]) => {
    if (mergedQuery[key]) {
      // If both queries have the same key, merge the values
      mergedQuery[key] = {
        eq: value.eq || mergedQuery[key].eq,
        in: value.in || mergedQuery[key].in,
      };
    } else {
      // If only baseFilterQuery has the key, add it as is
      mergedQuery[key] = value;
    }
  });

  return mergedQuery;
};
