import { FC, ReactElement } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';

export type InformationContentProps = {
  title: string;
  imageComponent?: ReactElement;
  text?: string;
  className?: string;
};

const InformationContent: FC<InformationContentProps> = ({ title, imageComponent = '', text = '', className }) => (
  <div className={cn('pt-14 lg:mb-28 flex flex-col justify-center items-center h-full text-center', className)}>
    <div className="mt-7 text-3xl font-bold">{title}</div>
    {imageComponent && <div className="mt-7">{imageComponent}</div>}
    {text && <div className="mt-7">{text}</div>}
  </div>
);

export default InformationContent;
