import { CSSProperties, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BaseHeader from '@/components/ui/Header';
import BaseIconLabel from '@/components/ui/IconLabel';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { resolveHoverColor } from '@/utils/colorPalette';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { SimpleHeaderParameters, SimpleHeaderProps, SimpleHeaderVariants } from '.';

const SimpleHeader: FC<SimpleHeaderProps & ReplaceFieldsWithAssets<SimpleHeaderParameters, 'logo'>> = ({
  variant,
  logo,
  links,
  backgroundColor,
  textColor,
  hoverTextColor,
}) => {
  const hoverText = resolveHoverColor(hoverTextColor, 'text', 'group-hover');
  return (
    <BaseHeader
      sticky={variant === SimpleHeaderVariants.Sticky}
      leftSection={
        logo?.[0]?.url && (
          <Link href="/">
            <Image
              src={logo[0].url}
              alt="Logo"
              width={logo[0].width || 100}
              height={logo[0].height || 100}
              className="h-10 w-auto"
            />
          </Link>
        )
      }
      backgroundColor={backgroundColor}
      color="general-color-1"
      spacing={{
        paddingTop: 'container-small',
        paddingBottom: 'container-small',
      }}
      border="none"
    >
      {links?.map(link => (
        <Link href={link.link?.path || ''} key={link.title}>
          <BaseIconLabel
            className="group"
            size="base"
            tag="span"
            color={textColor}
            weight="normal"
            font="sans"
            letterSpacing="normal"
            alignment="left"
          >
            <span className={hoverText.className} style={hoverText.style as CSSProperties}>
              {link.title}
            </span>
          </BaseIconLabel>
        </Link>
      ))}
    </BaseHeader>
  );
};

export default withFlattenParameters(SimpleHeader);
