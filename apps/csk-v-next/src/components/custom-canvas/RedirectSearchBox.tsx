'use client';
import { FC, HTMLInputTypeAttribute, useState } from 'react';

import { useRouter } from 'next/navigation';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { Text, TextProps, Button } from '@uniformdev/csk-components/components/ui';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { formatUniformLink } from '@/utils/routing';

type RedirectSearchBoxParameters = {
  fullWidth?: boolean;
  baseLink?: LinkParamValue;
  border?: string | ViewPort<string>;
  partNumberPlaceholder?: string;
  descriptionPlaceholder?: string;
  label?: string;
  labelSize?: TextProps['size'];
  labelColor?: TextProps['color'];
  font?: TextProps['font'];
  textSize?: TextProps['size'];
  size?: string;
  rowsCount?: string;
  type?: HTMLInputTypeAttribute;
};

type RedirectSearchBoxProps = ComponentProps<RedirectSearchBoxParameters>;

const RedirectSearchBox: FC<RedirectSearchBoxProps> = ({
  fullWidth,
  border,
  label,
  labelSize,
  labelColor,
  font,
  textSize,
  size,
  context,
  component,
  partNumberPlaceholder,
  descriptionPlaceholder,
  baseLink,
}) => {
  const isMini = component?.variant == 'mini';
  const router = useRouter();
  const href = formatUniformLink(baseLink);

  const [searchBoxValue, setSearchBoxValue] = useState('');
  const [keywordBoxValue, setKeywordBoxValue] = useState('');

  const inputClassnames = cn('rounded-none focus:outline-none w-full h-full', {
    [resolveViewPort(border, '{value}')]: border,
    [`text-${textSize}`]: textSize,
    [`p-${size}`]: size,
  });

  const onSearch = () => {
    if (isMini) {
      router.push(`${href}${searchBoxValue ? `?search=${searchBoxValue}` : ''}`);
    } else {
      router.push(
        `${href}${searchBoxValue ? `?search=${searchBoxValue}` : ''}${keywordBoxValue ? `&keyword=${keywordBoxValue}` : ''}`
      );
    }
  };

  if (isMini) {
    return (
      <div className={cn('flex items-center w-full h-full py-4', { 'w-full': fullWidth })}>
        <div className="size-full">
          <input
            type="text"
            value={searchBoxValue}
            onChange={e => setSearchBoxValue(e.target.value)}
            className={cn(inputClassnames, 'py-4')}
            placeholder={partNumberPlaceholder}
          />
        </div>
        <div className="flex">
          <Button buttonColor="black" textColor="general-color-3" className="h-[53px] p-4" onClick={onSearch}>
            <svg fill="#fff" height="20px" width="20px" viewBox="0 0 200 200" version="1.1" id="Capa_1">
              <path
                d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
	c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
	c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
	C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
	c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
	c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"
              />
            </svg>
          </Button>
        </div>
      </div>
    );
  }

  const onClear = () => {
    setSearchBoxValue('');
    setKeywordBoxValue('');
  };

  return (
    <div className={cn('flex flex-col items-start gap-y-4 w-full', { 'w-full': fullWidth })}>
      {label && (
        <Text className="whitespace-nowrap font-bold" size={labelSize} color={labelColor} font={font}>
          <UniformText placeholder="Text goes here" parameterId="label" component={component} context={context} />
        </Text>
      )}

      <div className="relative grid w-full grid-cols-12 gap-x-2">
        <div className="col-span-4 w-full">
          <input
            type="text"
            value={searchBoxValue}
            onChange={e => setSearchBoxValue(e.target.value)}
            className={cn(inputClassnames, 'py-4')}
            placeholder={partNumberPlaceholder}
          />
        </div>
        <div className="col-span-4 w-full">
          <input
            type="text"
            value={keywordBoxValue}
            onChange={e => setKeywordBoxValue(e.target.value)}
            className={inputClassnames}
            placeholder={descriptionPlaceholder}
          />
          {keywordBoxValue && (
            <button
              onClick={() => setKeywordBoxValue('')}
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
        <div className="col-span-2 w-full">
          <Button
            buttonColor="general-color-1"
            textColor="general-color-3"
            className="w-full p-4 font-bold uppercase"
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
        <div className="col-span-2 w-full">
          <Button
            buttonColor="black"
            textColor="general-color-3"
            className="w-full  p-4 font-bold uppercase"
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedirectSearchBox;
