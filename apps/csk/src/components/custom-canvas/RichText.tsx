import { FC } from 'react';
import {
  RichTextProps as CSKRichTextProps,
  RichText as CSKRichText,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

const RichText: FC<CSKRichTextProps> = props => (
  <CSKRichText className="w-full [&>table]:ml-2 [&>table]:text-base [&_td>p]:!m-0 [&_td>p]:p-2" {...props} />
);

export default withFlattenParameters(RichText);
