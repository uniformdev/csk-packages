import { FC } from 'react';
import { imageFrom } from '@uniformdev/assets';

import { ComponentContext, ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseImage from '@/components/ui/Image';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import BaseText from '@/components/ui/Text';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { formatUniformLink } from '@/utils/routing';
import { BaseButtonParameters, BaseImageParameters } from '.';

type ComponentProps = {
  isEditorPreviewMode?: boolean;
  component: Pick<ComponentContext, '_id'>;
  parameter?: ComponentParameter<string | undefined>;
  variant?: string;
};

export const BaseHeroText: FC<TextParameters & Omit<ComponentProps, 'variant'>> = ({
  component,
  parameter,
  text,
  isEditorPreviewMode,
  ...props
}) => {
  if (!text && !isEditorPreviewMode) return null;

  return (
    <BaseText {...props}>
      <UniformText
        placeholder="Text goes here"
        parameter={parameter as ComponentParameter<string>}
        as={props.tag || undefined}
        component={component}
      />
    </BaseText>
  );
};

export const BaseHeroButton: FC<
  ReplaceFieldsWithAssets<BaseButtonParameters, 'icon'> & { variant?: ButtonVariant } & Omit<ComponentProps, 'variant'>
> = ({ component, parameter, isEditorPreviewMode, text, ...props }) => {
  const { link, icon } = props;
  const href = formatUniformLink(link);

  if (!text && !href && !isEditorPreviewMode) return null;

  const Icon = () => {
    const [resolvedImage] = icon || [];
    const { url, title = '' } = resolvedImage || {};
    return url ? (
      <BaseImage
        src={url}
        alt={title}
        width={20}
        height={20}
        containerStyle={{
          width: '20px',
          height: '20px',
        }}
      />
    ) : undefined;
  };
  return (
    // eslint-disable-next-line react-hooks/static-components
    <BaseButton {...props} href={href} icon={<Icon />}>
      <UniformText
        placeholder="Button text goes here"
        parameter={parameter as ComponentParameter<string>}
        component={component}
      />
    </BaseButton>
  );
};

export const BaseHeroImage: FC<
  ReplaceFieldsWithAssets<BaseImageParameters, 'image'> & Omit<ComponentProps, 'parameter'>
> = ({
  component,
  isEditorPreviewMode,
  image,
  objectFit,
  width,
  height,
  overlayColor,
  contrastBaseColor,
  overlayOpacity,
  border,
  priority,
  unoptimized,
  fill,
  variant,
}) => {
  const [resolvedImage] = image || [];

  if (!resolvedImage) {
    const isPlaceholder = component?._id?.includes('placeholder_');

    if (!isEditorPreviewMode || isPlaceholder || !variant) {
      return null;
    }

    return (
      <div style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}>
        <MediaPlaceholder type="image" placeholder="Please add an asset to display an image" />
      </div>
    );
  }

  const { focalPoint, title = '' } = resolvedImage;

  const imageWidth = width || resolvedImage.width;
  const imageHeight = height || resolvedImage.height;

  if (!fill && (!imageWidth || !imageHeight)) {
    console.warn(
      'No dimensions provided for the Next.js Image component. Falling back to a standard <img> tag for rendering.'
    ); // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolvedImage.url} alt={title} />;
  }

  const imageUrl = imageFrom(resolvedImage?.url)
    .transform({
      width: width,
      height: height,
      fit: objectFit,
      focal: focalPoint,
    })
    .url();

  const variantBasedProps = fill
    ? { fill: true }
    : {
        width: imageWidth,
        height: imageHeight,
      };

  return (
    <BaseImage
      src={imageUrl}
      alt={title}
      unoptimized={unoptimized}
      priority={priority}
      sizes="100%"
      style={{ objectFit }}
      overlayColor={overlayColor}
      contrastBaseColor={contrastBaseColor}
      overlayOpacity={overlayOpacity}
      border={border}
      {...variantBasedProps}
    />
  );
};
