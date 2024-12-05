import { FC } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { CompositionContext, UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseImage from '@/components/ui/Image';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import BaseText from '@/components/ui/Text';
import { formatUniformLink, resolveAsset } from '@/utils';
import { ButtonParameters } from '../Button';
import { ImageParameters } from '../Image';
import { TextParameters } from '../Text';

type ComponentProps = {
  component: ComponentInstance;
  context: CompositionContext;
  parameterId: string;
};

export const Text: FC<TextParameters & ComponentProps> = ({ component, context, parameterId, text, ...props }) =>
  !text && !(context.previewMode === 'editor') ? null : (
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

export const Button: FC<ButtonParameters & { variant?: ButtonVariant } & ComponentProps> = ({
  component,
  context,
  parameterId,
  text,
  ...props
}) => {
  const href = formatUniformLink(props.link);

  if (!text && !href && !(context.previewMode === 'editor')) return null;

  const Icon = () => {
    const [resolvedImage] = resolveAsset(props.icon);
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

export const Image: FC<ImageParameters & Omit<ComponentProps, 'parameterId'>> = ({
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
    const isEditorPreviewMode = context.previewMode === 'editor';
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

  const { url, title = '' } = resolvedImage;

  return (
    <BaseImage
      containerStyle={{ ...(width ? { width: `${width}px` } : {}), ...(height ? { height: `${height}px` } : {}) }}
      src={url}
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
