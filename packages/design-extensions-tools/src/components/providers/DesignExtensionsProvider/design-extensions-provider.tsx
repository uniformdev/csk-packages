/* eslint-disable react-hooks/error-boundaries */
import { FC, PropsWithChildren, Suspense } from 'react';
import { DesignExtensionsProviderProps } from '.';
import { getTokenConfiguration } from '../../../scripts/run-time';

const WithStylesWrapper: FC<PropsWithChildren> = async ({ children }) => {
  const { colors, dimensions, defaultFont, borders } = (await getTokenConfiguration()) || {};
  return (
    <div className={defaultFont ? `font-${defaultFont}` : ''}>
      {!!colors && <div dangerouslySetInnerHTML={{ __html: colors }} />}
      {!!dimensions && <div dangerouslySetInnerHTML={{ __html: dimensions }} />}
      {!!borders && <div dangerouslySetInnerHTML={{ __html: borders }} />}
      {children}
    </div>
  );
};

export const DesignExtensionsProvider: FC<DesignExtensionsProviderProps> = ({ children, isPreviewMode = false }) => {
  try {
    if (!isPreviewMode && process.env.WATCH !== 'true') {
      return <div className="font-default">{children}</div>;
    }

    return (
      <Suspense fallback={<div className="font-default">{children}</div>}>
        <WithStylesWrapper>{children}</WithStylesWrapper>
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    return <div>{children}</div>;
  }
};
