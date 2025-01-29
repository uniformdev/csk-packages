import { FC } from 'react';
import { Page as CSKPage, PageProps as CSKPageProps } from '@uniformdev/csk-components/components/canvas';

// This is an example of how you can override an existing CSK component based on the Container component.
const Page: FC<CSKPageProps> = props => (
  <CSKPage
    headerCustomRenderer={({ child, key }) => (
      <div key={key} className="absolute w-full pt-12 sm:pt-16">
        {child}
      </div>
    )}
    {...props}
  />
);

export default Page;
