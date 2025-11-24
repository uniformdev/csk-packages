import { FC, HTMLInputTypeAttribute } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { Text, TextProps } from '@uniformdev/csk-components/components/ui';
import { ComponentProps, ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

type InputParameters = {
  fullWidth?: boolean;
  border?: string | ViewPort<string>;
  placeholder?: string;
  label?: string;
  labelSize?: TextProps['size'];
  labelColor?: TextProps['color'];
  font?: TextProps['font'];
  textSize?: TextProps['size'];
  size?: string;
  rowsCount?: string;
  type?: HTMLInputTypeAttribute;
};

type InputProps = ComponentProps<InputParameters>;

const Input: FC<InputProps & InputParameters> = ({
  fullWidth,
  border,
  placeholder,
  labelSize,
  labelColor,
  font,
  textSize,
  size,
  rowsCount,
  type,
  component,
  parameters,
}) => {
  const inputClassnames = cn('rounded-none outline-none w-full', {
    [resolveViewPort(border, '{value}')]: border,
    [`text-${textSize}`]: textSize,
    [`p-${size}`]: size,
  });

  return (
    <div className={cn('flex flex-col gap-y-2', { 'w-full': fullWidth })}>
      <Text size={labelSize} color={labelColor} font={font}>
        <UniformText
          placeholder="Text goes here"
          parameter={parameters.label as ComponentParameter<string>}
          component={component}
        />
      </Text>

      {!rowsCount || rowsCount == '1' ? (
        <input type={type} className={inputClassnames} placeholder={placeholder} />
      ) : (
        <textarea rows={parseInt(rowsCount)} className={inputClassnames} placeholder={placeholder} />
      )}
    </div>
  );
};

export default withFlattenParameters(Input);
