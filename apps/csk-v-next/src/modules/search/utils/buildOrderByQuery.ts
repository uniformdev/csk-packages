import { OrderBy } from '../types';

const buildOrderByQuery = (orderBy: OrderBy) => {
  return `${orderBy.field}_${orderBy.direction}`;
};

export default buildOrderByQuery;
