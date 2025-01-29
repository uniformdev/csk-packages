import { FC, PropsWithChildren, SVGProps } from 'react';

const PlusIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_8134_27)">
      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_8134_27">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ItemWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative flex !h-[60px] w-full items-center justify-center px-4 hover:bg-black/[2.5%]">
    {children}
    <div className="text-black/10">
      <PlusIcon className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <PlusIcon className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2" />
      <PlusIcon className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
      <PlusIcon className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
    </div>
  </div>
);

export default ItemWrapper;
