'use client';

import { FC, useRef } from 'react';
import Link from 'next/link';
import { LinkParamValue } from '@uniformdev/canvas';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas/clientCompatible';
import { Container as BaseContainer } from '@uniformdev/csk-components/components/ui';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { DownloadIcon, FullScreenIcon } from '@/components/custom-ui/icons';

type TemplatePreviewParameters = {
  templateLink?: LinkParamValue;
  downloadLink?: LinkParamValue;
  previewLink?: LinkParamValue;
} & ContainerParameters;

type TemplatePreviewProps = ComponentProps<TemplatePreviewParameters>;

const TemplatePreview: FC<TemplatePreviewProps & TemplatePreviewParameters> = ({
  templateLink,
  downloadLink,
  previewLink,
  backgroundColor,
  spacing,
  height,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const templateLinkHref = formatUniformLink(templateLink);
  const downloadLinkHref = formatUniformLink(downloadLink);
  const previewLinkHref = formatUniformLink(previewLink);

  const openIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen();
    }
  };

  const onDownloadTemplate = () => {
    if (!downloadLinkHref) return;
    window.open(downloadLinkHref, '_blank');
  };

  return (
    <BaseContainer className="relative" {...{ backgroundColor, spacing, fluidContent: true, height }}>
      <iframe ref={iframeRef} src={templateLinkHref} className="size-full min-h-[600px] rounded-sm shadow" />
      <div
        className={cn('my-8 flex flex-col gap-4 md:flex-row md:justify-between', { 'justify-end': !previewLinkHref })}
      >
        {previewLinkHref ? (
          <Link
            className="bg-button-primary p-3 text-center text-sm
           font-bold uppercase text-white dark:bg-white dark:text-black sm:text-base"
            target="_blank"
            href={previewLinkHref}
          >
            Preview the template
          </Link>
        ) : null}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <button
            onClick={onDownloadTemplate}
            className="flex items-center gap-4 py-2 text-sm font-bold uppercase text-text-tertiary sm:p-3 sm:text-base "
          >
            <div className="text-text-tertiary">
              <DownloadIcon />
            </div>
            <p>Download Template</p>
          </button>
          <button
            onClick={openIframe}
            className="flex items-center gap-4 rounded-sm py-2 text-sm font-bold uppercase text-text-tertiary sm:p-3 sm:text-base "
          >
            <div className="text-text-tertiary">
              <FullScreenIcon />
            </div>
            <p>Full Screen Mode</p>
          </button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default withFlattenParameters(TemplatePreview);
