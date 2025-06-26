'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Text } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

export type AnchorLinksParameters = {
  size?: string;
  color?: string;
  font?: string;
  weight?: string;
  containerId?: string;
};

type AnchorLink = {
  title: string;
  href: string;
  top: number;
};

const SCROLL_OFFSET = 250;

type AnchorLinksProps = ComponentProps<AnchorLinksParameters>;

export const DEFAULT_COMPONENT_DETAILS_PAGE_ID = 'component-details-page-content-section';

const AnchorLinks: FC<AnchorLinksProps> = ({ size, color, font, weight, containerId }) => {
  const [anchorLinks, setAnchorLinks] = useState<AnchorLink[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<AnchorLink | null>(null);

  useEffect(() => {
    const container = document.getElementById(containerId || DEFAULT_COMPONENT_DETAILS_PAGE_ID);
    if (!container) return; // Early return to prevent unnecessary querying if container is not found.

    const pageSections = container.querySelectorAll('div[id]:not(#mobile-header)');
    const divsArray = Array.from(pageSections) as HTMLElement[];

    const anchors = divsArray.map(div => ({
      title: div.title,
      href: `#${div.id}`,
      top: div.offsetTop,
    }));

    setAnchorLinks(anchors);

    const currentAnchor = anchors.find(anchor => anchor.href === window.location.hash);

    if (currentAnchor) {
      setActiveAnchor(currentAnchor);
    }
  }, [containerId]);

  const scrollHandler = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;

    const activeAnchor = [...anchorLinks].reverse().find(anchor => anchor.top <= scrollTop + SCROLL_OFFSET);

    if (activeAnchor) {
      setActiveAnchor(activeAnchor);
    } else if (!activeAnchor && anchorLinks.length) {
      setActiveAnchor(null);
    }
  }, [anchorLinks]);

  useEffect(() => {
    if (activeAnchor) {
      window.history.replaceState({}, '', activeAnchor.href);
    }
  }, [activeAnchor]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const onManuallySelectAnchor = (anchor: AnchorLink) => {
    window.history.replaceState({}, '', anchor.href);
  };

  return (
    <div className="flex flex-col lg:sticky lg:top-28">
      {anchorLinks.map(link => (
        <Link
          className={cn('border-t last-of-type:border-b border-[#D1D5DB]', {})}
          key={link.href}
          href={link.href}
          onClick={() => onManuallySelectAnchor(link)}
        >
          <div
            className={cn(
              'flex justify-between mx-1 my-[2px] px-5 py-4 items-center hover:bg-sky-50 dark:hover:bg-[#0036CF]',
              {
                'bg-[#DCEEFF] dark:bg-general-color-5': activeAnchor?.href === link.href,
              }
            )}
          >
            <Text size={size} color={color} font={font} weight={weight}>
              {link.title}
            </Text>
            <div className="-rotate-90 text-[#0036CF] dark:text-white">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnchorLinks;
