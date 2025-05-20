'use client';

import { FC, MouseEventHandler, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { AssetParamValueItem } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { Container, Image } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { capitalizeFirstLetter } from '@/utils/text';
import { CheckIcon, CopyIcon } from './icons';

const KEY_TO_EXCLUDE = ['_contextualEditing'];
const sanitizeComponentDataToClipBoard = <T,>(obj: T): T | Record<string, unknown> | unknown[] => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(value => sanitizeComponentDataToClipBoard(value));
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !KEY_TO_EXCLUDE.includes(key))
      .map(([key, value]) => [key, sanitizeComponentDataToClipBoard(value)])
  );
};

const WrapCard: FC<PropsWithChildren & { href?: string; name: string }> = ({ href, name, children }) =>
  href?.length ? (
    <Link href={href} title={name} className="*:transition *:duration-150 *:ease-in-out *:hover:scale-[1.01]">
      {children}
    </Link>
  ) : (
    children
  );

type DemoCardParameters = {
  title: string;
  patternId: string;
  link?: LinkParamValue;
  previewImage?: AssetParamValueItem[];
  anchor?: string;
  enableComponentPreview?: boolean;
};

enum DemoCardSlots {
  DemoItem = 'demoItem',
}

type DemoCardProps = ComponentProps<ContainerParameters & DemoCardParameters, DemoCardSlots>;

const DemoCard: FC<DemoCardProps> = ({
  title,
  link,
  previewImage,
  anchor,
  slots,
  component,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  context,
  enableComponentPreview,
  patternId,
}) => {
  const [currentTheme, setCurrentTheme] = useState(context.searchParams?.theme || 'light');
  const { resolvedTheme } = useTheme();
  const href = formatUniformLink(link);
  const [isCopy, setIsCopy] = useState(false);
  const [resolvedImage] = resolveAsset(previewImage);
  const { url, title: imageTitle = '', width, height } = resolvedImage || {};
  const [name, currentComponentCache] = useMemo(() => {
    const componentData = component.slots?.[slots.demoItem.name][0];
    return [
      componentData?.type || '',
      componentData
        ? JSON.stringify({
            format: 'uniform/copied-component-subtree-1.0',
            componentData: sanitizeComponentDataToClipBoard(componentData),
          })
        : '',
    ];
  }, [component.slots, slots.demoItem?.name]);

  const copyToClipboard: MouseEventHandler<HTMLButtonElement> = (e?) => {
    e?.preventDefault();
    navigator.clipboard
      .writeText(currentComponentCache)
      .then(() => {
        setIsCopy(true);
        return new Promise(resolve => setTimeout(resolve, 3000));
      })
      .then(() => setIsCopy(false));
  };

  const isContextualEditing = context?.isContextualEditing && context?.previewMode === 'editor';
  const hasCanvasPreviewImage = Boolean(previewImage);

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const componentImagePreviewUrl = hasCanvasPreviewImage
    ? url
    : `/preview-images/${currentTheme}/${component._pattern || patternId}.jpeg`;

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <WrapCard href={href && anchor ? `${href}#${anchor}` : href} name={capitalizeFirstLetter(name)}>
        <div className="flex flex-col justify-between gap-4">
          {enableComponentPreview ? (
            <div className={classNames({ 'pointer-events-none': href && anchor && !isContextualEditing })}>
              <UniformSlot data={component} context={context} slot={slots.demoItem} />
            </div>
          ) : (
            <Image
              className="aspect-video object-contain"
              src={componentImagePreviewUrl}
              alt={imageTitle}
              width={width || 574}
              height={height || 200}
              unoptimized
            />
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-semibold text-text-primary">{title}</p>
            <button className="cursor-pointer p-1" title="Copy to clipboard" onClick={copyToClipboard}>
              {currentComponentCache && !isCopy ? (
                <CopyIcon className="size-5 text-button-primary transition duration-1000 hover:text-blue-200 hover:duration-100 dark:text-white" />
              ) : (
                <CheckIcon className="size-5 text-button-primary transition duration-700" />
              )}
            </button>
          </div>
        </div>
      </WrapCard>
    </Container>
  );
};

export default DemoCard;
