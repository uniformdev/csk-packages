/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import { ThemePackProps } from '.';
import { getTokenConfiguration } from '../../../scripts/run-time';

// @ts-ignore: ToDo add types for rsc
export const ThemePack: FC<ThemePackProps> = async ({ children, isPreviewMode = false }) => {
  try {
    if (!isPreviewMode && process.env.WATCH !== 'true') {
      return <div>{children}</div>;
    }

    const { colors, dimensions, defaultFont, borders } = (await getTokenConfiguration()) || {};
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className={defaultFont ? `font-${defaultFont}` : ''}>
        {!!colors && <div dangerouslySetInnerHTML={{ __html: colors }} />}
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
