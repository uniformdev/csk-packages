import { FC } from 'react';
import { ButtonProps as CSKButtonProps, Button as CSKButton } from '@uniformdev/csk-components/components/canvas';

type RemoveButtonProps = CSKButtonProps;

const RemoveButton: FC<RemoveButtonProps> = props => {
  const onClick = () => {
    console.info('product removed');
  };

  return <CSKButton {...props} onClick={onClick} />;
};

export default RemoveButton;
