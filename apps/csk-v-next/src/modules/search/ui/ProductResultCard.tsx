import { FC } from 'react';
import Link from 'next/link';
import { ContentType, WithUniformContentEntrySystemParams, Product } from '../types';

export type ProductCardProps = WithUniformContentEntrySystemParams<Product> & {
  contentType: ContentType.Product;
  textColor?: string;
  border?: string;
};

const ProductResultCard: FC<ProductCardProps> = ({
  title,
  name,
  slug,
  status,
  category,
  rohs,
  leadFree,
  halogenFree,
  applications,
}) => {
  return (
    <div className="grid grid-cols-8">
      <div className="border-x border-b border-gray-300 bg-white px-4 py-2 text-center text-gray-500">
        <Link className="font-bold capitalize text-general-color-1" href={`/products/${slug.toLowerCase()}`}>
          {title}
        </Link>
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {name}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {Array.isArray(category) ? category[0].title : category?.title}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {Array.isArray(applications) ? applications?.[0]?.title : applications?.title}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {status}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {rohs}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {leadFree}
      </div>
      <div className="border-b border-r border-gray-300 bg-white px-4 py-2 text-center capitalize text-gray-500">
        {halogenFree}
      </div>
    </div>
  );
};

export default ProductResultCard;
