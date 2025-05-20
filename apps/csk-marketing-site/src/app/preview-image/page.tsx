import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import { UniformSlot, ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { cskComponentsMapping } from '@/components/canvas';
import { customComponentsMapping } from '@/components/custom-canvas';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  const searchParams = await props.searchParams;

  const onlyTitle = Boolean(searchParams.onlyTitle);

  const PreviewComponent: FC<ComponentProps<unknown, 'demoItem'>> = ({ component, context, slots }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const patternTitle = component._name;
    const type = component.slots?.['demoItem']?.[0]?.type;
    return (
      <div
        className={classNames('flex h-screen w-screen items-center justify-center', {
          'items-stretch': type === 'richText',
          'text-center': type === 'text',
          '*:w-full': searchParams.fullWidth,
        })}
      >
        {onlyTitle ? (
          <div className="flex w-full items-center justify-center gap-x-10 p-6 text-5xl font-bold">
            <div className="relative shrink-0">
              <Image
                src="https://canary-theme-pack-2.vercel.app/badge.svg"
                alt="Design Extensions"
                className="size-[120px]"
                width={120}
                height={120}
              />
            </div>
            <span>{patternTitle}</span>
          </div>
        ) : (
          <UniformSlot data={component} context={context} slot={slots.demoItem} />
        )}
      </div>
    );
  };

  const previewMap: ComponentMapping = {
    ...cskComponentsMapping,
    ...customComponentsMapping,
    demoCard: { component: PreviewComponent },
  };

  const componentResolver = createComponentResolver(previewMap);

  return (
    <div
      className={cn({
        'dark bg-page-background-primary text-white': searchParams.theme === 'dark',
        'bg-[#f9fafb]': searchParams.canvas,
      })}
    >
      <DesignExtensionsProvider>
        <UniformPlayground
          searchParams={Promise.resolve({
            is_incontext_editing_mode: 'false',
            is_incontext_editing_playground: 'false',
            patternType: 'component',
            id: searchParams.id,
          })}
          resolveComponent={componentResolver}
        />
      </DesignExtensionsProvider>
    </div>
  );
}
