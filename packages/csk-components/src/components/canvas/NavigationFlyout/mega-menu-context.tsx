'use client';

import { createContext } from 'react';

export type MegaMenuContextValue = {
  isInsideCategorizedMegaMenu: boolean;
};

export const MegaMenuContext = createContext<MegaMenuContextValue>({
  isInsideCategorizedMegaMenu: false,
});
