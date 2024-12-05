import { FC } from 'react';
import Image from 'next/image';
import type { Asset } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import { UniformText, ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type ConditionalValuesTestParameters = {
  simpleText?: string;
  asset?: Asset[];
  imageUrl?: string;
};

export type ConditionalValuesTestProps = ComponentProps<ConditionalValuesTestParameters>;

export const ConditionalValuesTest: FC<ConditionalValuesTestProps> = ({ asset, imageUrl, component, context }) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-4xl md:text-5xl">ConditionalValuesTest component</h1>
    <p>
      <strong>Type/Public id:</strong> {component.type}
    </p>
    {!!component?.variant && (
      <p>
        <strong>Selected Variant:</strong> {component?.variant}
      </p>
    )}
    <strong>Parameters:</strong>
    <ul className="list-inside list-disc space-y-1 pl-2">
      <li>
        <strong>simpleText: </strong>
        <UniformText
          parameterId="simpleText"
          placeholder="Simple Text goes here"
          context={context}
          component={component}
        />
      </li>
      <li>
        <strong>asset: </strong>
        {(flattenValues(asset as never) || [])
          .filter(({ url }) => Boolean(url))
          .map(({ title, url }, index) => (
            <Image key={index} src={url} width={200} height={200} alt={title} />
          ))}
      </li>
      <li>
        <strong>imageUrl: </strong>
        {!!imageUrl && <Image src={imageUrl} width={200} height={200} alt="example" />}
      </li>
    </ul>
  </div>
);
