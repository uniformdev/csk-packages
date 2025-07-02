/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import { DesignExtensionsProviderProps } from '.';
import { getTokenConfiguration } from '../../../scripts/run-time';

// @ts-ignore: ToDo add types for rsc
export const DesignExtensionsProvider: FC<DesignExtensionsProviderProps> = async ({
  children,
  isPreviewMode = false,
}) => {
  try {
    if (!isPreviewMode && process.env.WATCH !== 'true') {
      return <div className="font-default">{children}</div>;
    }

    const { colors, dimensions, defaultFont, borders } = (await getTokenConfiguration()) || {};
    return (
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
