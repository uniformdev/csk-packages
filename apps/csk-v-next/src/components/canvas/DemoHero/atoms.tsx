import { FC } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { CompositionContext, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseImage from '@/components/ui/Image';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import BaseText from '@/components/ui/Text';
import { FIT_OPTIONS, getResizedAssetUrl } from '@/utils/assetFocalPoint';
import { resolveAsset } from '@/utils/assets';
import { formatUniformLink } from '@/utils/routing';
import { BaseButtonParameters, BaseImageParameters } from '.';

type ComponentProps = {
  component: ComponentInstance;
  context: CompositionContext;
  parameterId: string;
};

export const BaseHeroText: FC<TextParameters & ComponentProps> = ({
  component,
  context,
  parameterId,
  text,
  ...props
}) => {
  const isEditorPreviewMode = context.previewMode === 'editor' && context.isContextualEditing;

  if (!text && !isEditorPreviewMode) return null;

  return (
    <BaseText {...props}>
      <UniformText
        placeholder="Text goes here"
        parameterId={parameterId}
        as={props.tag || undefined}
        component={component}
        context={context}
      />
    </BaseText>
  );
};

export const BaseHeroButton: FC<BaseButtonParameters & { variant?: ButtonVariant } & ComponentProps> = ({
  component,
  context,
  parameterId,
  text,
  ...props
}) => {
  const { link, icon } = props;
  const href = formatUniformLink(link);

  const isEditorPreviewMode = context.previewMode === 'editor' && context.isContextualEditing;

  if (!text && !href && !isEditorPreviewMode) return null;

  const Icon = () => {
    const [resolvedImage] = resolveAsset(icon);
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
    <BaseButton {...props} href={href} icon={<Icon />}>
      <UniformText
        placeholder="Button text goes here"
        parameterId={parameterId}
        component={component}
        context={context}
      />
    </BaseButton>
  );
};

export const BaseHeroImage: FC<BaseImageParameters & Omit<ComponentProps, 'parameterId'>> = ({
  component,
  context,
  image,
  objectFit,
  width,
  height,
  overlayColor,
  overlayOpacity,
  border,
  priority,
  unoptimized,
}) => {
  const [resolvedImage] = resolveAsset(image);

  if (!resolvedImage) {
    const isEditorPreviewMode = context.previewMode === 'editor' && context.isContextualEditing;
    const isPlaceholder = component?._id?.includes('placeholder_');

    if (!isEditorPreviewMode || isPlaceholder || !component.variant) {
      return null;
    }

    return (
      <div style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}>
        <MediaPlaceholder type="image" placeholder="Please add an asset to display an image" />
      </div>
    );
  }

  const { url, title = '', focalPoint } = resolvedImage;
  const imageUrl = getResizedAssetUrl(url, 1000, 1000, FIT_OPTIONS.COVER, focalPoint) || url;
  return (
    <BaseImage
      containerStyle={{ ...(width ? { width: `${width}px` } : {}), ...(height ? { height: `${height}px` } : {}) }}
      src={imageUrl}
      alt={title}
      fill
      unoptimized={unoptimized}
      priority={priority}
      sizes="100%"
      style={{ objectFit }}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      border={border}
    />
  );
};
