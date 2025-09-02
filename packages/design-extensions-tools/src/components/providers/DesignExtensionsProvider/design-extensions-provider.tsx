import { FC } from 'react';
import { DesignExtensionsProviderProps } from '.';

export const DesignExtensionsProvider: FC<DesignExtensionsProviderProps> = ({
  children,
  isPreviewMode = false,
  tokenConfiguration,
}) => {
  if (!isPreviewMode && process.env.WATCH !== 'true') {
    return <div className="font-default">{children}</div>;
  }

  const { colors, dimensions, defaultFont, borders } = tokenConfiguration || {};
  return (
    <div className={defaultFont ? `font-${defaultFont}` : ''}>
      {!!colors && <div dangerouslySetInnerHTML={{ __html: colors }} />}
      {!!dimensions && <div dangerouslySetInnerHTML={{ __html: dimensions }} />}
      {!!borders && <div dangerouslySetInnerHTML={{ __html: borders }} />}
      {children}
    </div>
  );
};
