'use client';

import { FC, MouseEventHandler, PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { ComponentInstance } from '@uniformdev/canvas';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { Container, Image } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { capitalizeFirstLetter } from '@/utils/text';
import { DemoCardParameters, DemoCardProps } from '.';
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

export const DemoCard: FC<DemoCardProps & DemoCardParameters & { slotData?: Record<string, ComponentInstance[]> }> = ({
  title,
  link,
  previewImage,
  anchor,
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  context,
  enableComponentPreview,
  patternId,
  slotData,
}) => {
  const [currentTheme, setCurrentTheme] = useState(context.pageState.keys?.theme || 'light');
  const { resolvedTheme } = useTheme();

  const href = formatUniformLink(link);
  const [isCopy, setIsCopy] = useState(false);
  const [resolvedImage] = resolveAsset(previewImage);
  const { url, title: imageTitle = '', width: imageWidth, height: imageHeight } = resolvedImage || {};

  const copyToClipboard: MouseEventHandler<HTMLButtonElement> = (e?) => {
    e?.preventDefault();
    navigator.clipboard
      .writeText(
        JSON.stringify({
          format: 'uniform/copied-component-subtree-1.0',
          componentData: sanitizeComponentDataToClipBoard(slotData?.demoItem?.[0]),
        })
      )
      .then(() => {
        setIsCopy(true);
        return new Promise(resolve => setTimeout(resolve, 3000));
      })
      .then(() => setIsCopy(false));
  };
  const hasCanvasPreviewImage = Boolean(previewImage);

  useEffect(() => {
    if (resolvedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const componentImagePreviewUrl = hasCanvasPreviewImage ? url : `/preview-images/${currentTheme}/${patternId}.jpeg`;

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, height }}>
      <WrapCard
        href={href && anchor ? `${href}#${anchor}` : href}
        name={capitalizeFirstLetter(slotData?.demoItem?.[0]?.type || '')}
      >
        <div className="flex flex-col justify-between gap-4">
          {enableComponentPreview ? (
            <div className={classNames({ 'pointer-events-none': href && anchor && !context.isContextualEditing })}>
              <UniformSlot slot={slots.demoItem} />
            </div>
          ) : (
            <Image
              className="aspect-video object-contain"
              src={componentImagePreviewUrl}
              alt={imageTitle}
              width={imageWidth || 574}
              height={imageHeight || 200}
              unoptimized
            />
          )}

          {slotData?.demoItem?.[0] && (
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-semibold text-text-primary">{title}</p>
              <button className="cursor-pointer p-1" title="Copy to clipboard" onClick={copyToClipboard}>
                {!isCopy ? (
                  <CopyIcon className="size-5 text-button-primary transition duration-1000 hover:text-blue-200 hover:duration-100" />
                ) : (
                  <CheckIcon className="size-5 text-button-primary transition duration-700" />
                )}
              </button>
            </div>
          )}
        </div>
      </WrapCard>
    </Container>
  );
};
