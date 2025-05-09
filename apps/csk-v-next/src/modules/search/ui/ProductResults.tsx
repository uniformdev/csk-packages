import { FC } from 'react';
import { ContentType, WithUniformContentEntrySystemParams, Product, Pagination, Article } from '../types';
import ProductResultCard from './ProductResultCard';

export type ProductCardProps = {
  textColor?: string;
  border?: string;
  entries: Pagination<WithUniformContentEntrySystemParams<Product | Article>>;
};

const ProductResults: FC<ProductCardProps> = ({ textColor, border, entries }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7">
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Part #</div>
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Description</div>
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Applications</div>
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Product Status</div>
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">RoHS</div>
        <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Lead Free</div>
        <div className=" bg-gray-200 px-4 py-2 text-center text-gray-500">Helogen Free</div>
      </div>
      {entries?.items.map(entry => {
        const entryContentType = entry.contentType as ContentType.Article | ContentType.Product;

        if (entryContentType === ContentType.Product) {
          const productEntry = entry as WithUniformContentEntrySystemParams<Product>;
          return (
            <ProductResultCard
              {...productEntry}
              textColor={textColor}
              border={border}
              contentType={ContentType.Product}
              key={entry.id}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProductResults;
