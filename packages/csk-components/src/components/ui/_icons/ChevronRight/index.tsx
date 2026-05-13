import { FC, SVGProps } from 'react';

const ChevronRight: FC<SVGProps<SVGElement>> = ({ width = 16, height = 16, stroke = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRight;
