import { ResolveEmptyPlaceholderOptions } from '@uniformdev/csk-components/types/cskTypes';
import { DEFAULT_EMPTY_PLACEHOLDER } from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';
import { TableSlots } from '.';

export const TableEmptyPlaceholder = (props: ResolveEmptyPlaceholderOptions) => {
  switch (props.slotName) {
    case TableSlots.TableHead:
      return {
        component: () => <tr className="h-20" />,
      };
    case TableSlots.TableBody:
      return {
        component: () => <tr className="h-40" />,
      };
    default:
      return DEFAULT_EMPTY_PLACEHOLDER;
  }
};
