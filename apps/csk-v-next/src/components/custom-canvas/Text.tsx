import { FC } from 'react';
import { TextProps as CSKTextProps, Text as CSKText } from '@uniformdev/csk-components/components/canvas';

type TextProps = CSKTextProps & {
  maxWidth?: string;
};

const Text: FC<TextProps> = props => (
  <div className="flex justify-start" style={{ width: props.maxWidth }}>
    <CSKText {...props} />
  </div>
);

export default Text;
