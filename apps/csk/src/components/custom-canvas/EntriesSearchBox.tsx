'use client';

import { FC, HTMLInputTypeAttribute, ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UniformText, ComponentParameter } from '@uniformdev/canvas-next-rsc-v2/component';
import { Text, TextProps } from '@uniformdev/csk-components/components/ui';
import { ViewPort, ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';

type EntriesSearchBoxParameters = {
  delay?: number;
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

type EntriesSearchBoxProps = ComponentProps<EntriesSearchBoxParameters>;

const EntriesSearchBox: FC<EntriesSearchBoxProps & EntriesSearchBoxParameters> = ({
  delay = 300,
  fullWidth,
  border,
  label,
  placeholder,
  labelSize,
  labelColor,
  font,
  textSize,
  size,
  component,
  parameters,
}) => {
  const { setSearch, searchBoxValue, setSearchBoxValue } = useEntriesSearchContext();

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, delay);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchBoxValue(newValue);
    debouncedSetSearch(newValue);
  };

  const handleClearInput = () => {
    setSearchBoxValue('');
    setSearch('');
  };

  const inputClassnames = cn('rounded-none focus:outline-current w-full', {
    [resolveViewPort(border, '{value}')]: border,
    [`text-${textSize}`]: textSize,
    [`p-${size}`]: size,
  });

  return (
    <div className={cn('flex flex-col gap-y-2', { 'w-full': fullWidth })}>
      {label && (
        <Text size={labelSize} color={labelColor} font={font}>
          <UniformText
            placeholder="Text goes here"
            parameter={parameters.label as ComponentParameter<string>}
            component={component}
          />
        </Text>
      )}

      <div className="relative">
        <input
          type="text"
          value={searchBoxValue}
          onChange={handleInputChange}
          className={inputClassnames}
          placeholder={placeholder}
        />
        {searchBoxValue && (
          <button
            onClick={handleClearInput}
            className="absolute right-2 top-0 flex h-full items-center justify-center opacity-50 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default withFlattenParameters(EntriesSearchBox);
