/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, PropsWithChildren } from 'react';
import { getColors, getDimensions, getDefaultFont, getBorders } from '../scripts/run-time';

// @ts-ignore: ToDo add types for rsc
export const ThemePackProvider: FC<PropsWithChildren> = async ({ children }) => {
  try {
    const [palette, dimensions, defaultFont, borders] = await Promise.all([
      getColors(),
      getDimensions(),
      getDefaultFont(),
      getBorders(),
    ]);
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className={defaultFont ? `font-${defaultFont}` : ''}>
        {!!palette && <div dangerouslySetInnerHTML={{ __html: palette }} />}
        {!!dimensions && <div dangerouslySetInnerHTML={{ __html: dimensions }} />}
        {!!borders && <div dangerouslySetInnerHTML={{ __html: borders }} />}
        {children}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <div>{children}</div>;
  }
};
