interface Category {
  id: string;
  name: string;
  cap: number;
  values: { id: string; value: string }[];
}

export const mapValuesToString = (data: Category[]): string => {
  return data.flatMap(category => category.values.map(item => item.id)).join(', ');
};
