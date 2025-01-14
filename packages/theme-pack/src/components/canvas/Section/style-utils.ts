import { cn } from '@uniformdev/theme-pack/utils/styling';
import { ContentAlignment, SectionParameters } from '.';

type AlignmentClass = {
  contentAlignment: SectionParameters['contentAlignment'];
};

export const getButtonAlignmentClass = ({ contentAlignment }: AlignmentClass) =>
  cn('justify-center', {
    '!justify-start': contentAlignment === ContentAlignment.Left,
    '!justify-end': contentAlignment === ContentAlignment.Right,
  });

export const getTextAlignmentClass = ({ contentAlignment }: AlignmentClass) =>
  cn('text-center', {
    'text-start': contentAlignment === ContentAlignment.Left,
    'text-end': contentAlignment === ContentAlignment.Right,
  });
