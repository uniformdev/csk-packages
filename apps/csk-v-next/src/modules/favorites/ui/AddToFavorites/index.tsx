'use client';
import dynamic from 'next/dynamic';
import { AddToFavoritesSkeleton } from '@/modules/favorites';

export const AddToFavorites = dynamic(() => import('./AddToFavorites').then(mod => mod.AddToFavorites), {
  ssr: false,
  loading: () => <AddToFavoritesSkeleton />,
});
