/**
 * ⚠️ Server-only Components
 *
 * This file exports components intended to be used exclusively within server components.
 * These components are tightly coupled with server-side logic and should not be imported
 * into client-side modules.
 *
 * Components:
 * - Breadcrumbs: relies on `compositionCache`
 * - Tabs: relies on `compositionCache` through `withSlotsDataValue` and `getSlotComponents`
 */

// Component - Properties(Parameters) - Slots - Variants
export { default as Breadcrumbs, type BreadcrumbsProps, type BreadcrumbsParameters } from './Breadcrumbs';
export { default as Tabs, type TabsProps, type TabsParameters, TabsSlots, TabsVariants } from './Tabs';
