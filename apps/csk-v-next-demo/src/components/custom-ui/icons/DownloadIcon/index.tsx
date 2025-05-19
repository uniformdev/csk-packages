import { FC, SVGProps } from 'react';

const DownloadIcon: FC<SVGProps<SVGElement>> = ({ width = 23, height = 27, fill = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 27" fill={fill}>
    <path d="M17.8118 8.60954L11.4302 14.9912V0H8.4606V14.9912L2.07897 8.60954L0 10.6871L9.94543 20.6326L19.8909 10.6871L17.8118 8.60954Z" />
    <path d="M1.78125 23.7495H18.1083V26.7177H1.78125V23.7495Z" />
  </svg>
);

export default DownloadIcon;
