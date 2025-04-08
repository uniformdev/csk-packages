import type { Asset } from '@uniformdev/assets';
import type { AssetParamValueItem } from '@uniformdev/canvas';
import { ASSETS_SOURCE_UNIFORM } from '@uniformdev/canvas';

export const isMediaAssets = (media?: MediaType): media is AssetParamValueItem[] =>
  Boolean(media && typeof media !== 'string' && Array.isArray(media) && media.length && 'fields' in media[0]);

export const getMediaUrl = (media?: MediaType) => {
  const mediaUrl: string | undefined = (() => {
    // If it is string image url
    if (typeof media === 'string') return media;
    // If it is asset library image
    if (isMediaAsset(media)) return media?.fields?.url?.value;
    // If it is asset library images
    if (isMediaAssets(media)) return media?.[0]?.fields?.url?.value;
    return undefined;
  })();

  if (!mediaUrl || mediaUrl === 'unresolved') return '';

  if (typeof mediaUrl === 'string' && mediaUrl.startsWith('//')) return mediaUrl.replace('//', 'https://');

  return mediaUrl;
};

export const isMediaAsset = (media?: MediaType): media is AssetParamValueItem =>
  Boolean(media && typeof media !== 'string' && 'fields' in media);

export type MediaType = string | { path?: string } | AssetParamValueItem | AssetParamValueItem[] | Asset;

type FocalPoint =
  | {
      x: number;
      y: number;
    }
  | 'auto'
  | 'center';

export type FitOption = 'scale-down' | 'contain' | 'cover';

export const FIT_OPTIONS = {
  SCALE_DOWN: 'scale-down' as FitOption,
  CONTAIN: 'contain' as FitOption,
  COVER: 'cover' as FitOption,
} as const;

/**
 * Checks if an asset is hosted by Uniform
 * @param asset The asset to check
 * @returns True if the asset is hosted by Uniform, false otherwise
 */
export const isAssetLibraryAsset = (asset?: AssetParamValueItem): asset is AssetParamValueItem => {
  return Boolean(asset && asset._source === ASSETS_SOURCE_UNIFORM);
};

/**
 * Get a resized asset URL with optional parameters
 * @param media The media asset
 * @param width Optional width (must be between 1 and 4096)
 * @param height Optional height (must be between 1 and 4096)
 * @param fit Fit option (defaults to scale-down)
 * @param focalPoint Optional focal point for cropping
 * @returns The resized asset URL or undefined
 */
export const getResizedAssetUrl = (
  url: string,
  width: number,
  height: number,
  cropWidth: number,
  cropHeight: number,
  fit?: FitOption,
  focalPoint?: FocalPoint
) => {
  // Create URLSearchParams object for building the query string
  const searchParams = new URLSearchParams();

  searchParams.append('width', cropWidth.toString());
  searchParams.append('height', cropHeight.toString());

  // Add fit parameter if provided
  if (fit) {
    searchParams.append('fit', fit);
  }

  // Add focal point if available
  const focalPointValue = getFocalPointValue(focalPoint);

  if (fit === FIT_OPTIONS.COVER && focalPointValue && typeof focalPoint === 'object') {
    const focal = getCorrectFocalPoint(width, height, cropWidth, cropHeight, focalPoint?.x, focalPoint?.y);

    searchParams.append('focal', focal);
  }

  // Convert params to string and check if we have any params
  const queryString = searchParams.toString();
  const urlWithParams = queryString ? `${url}?${queryString}` : url;
  return urlWithParams;
};

/**
 * Get the value for the focal point parameter
 * @param focalPoint The focal point
 * @returns The focal point value for the URL parameter
 */
const getFocalPointValue = (focalPoint?: FocalPoint): string | undefined => {
  if (!focalPoint) return undefined;

  // Handle string options
  if (focalPoint === 'auto' || focalPoint === 'center') {
    return focalPoint;
  }

  // Handle coordinate object
  if (typeof focalPoint === 'object' && 'x' in focalPoint && 'y' in focalPoint) {
    return `${focalPoint.x}x${focalPoint.y}`;
  }

  return undefined;
};

export const getAssetFocalPoint = (media?: MediaType): FocalPoint | undefined => {
  if (!isMediaAsset(media)) return undefined;
  const defaultFocalPoint: FocalPoint = 'center';
  return media?.fields?.focalPoint?.value || defaultFocalPoint;
};

export const getFitQueryParam = (fit?: FitOption) => {
  if (!fit) return '';
  return `fit=${fit}`;
};

export const getFocalPointQueryParam = (focalPoint?: FocalPoint) => {
  if (!focalPoint) return '';

  // Handle string options
  if (focalPoint === 'auto' || focalPoint === 'center') {
    return `focal=${focalPoint}`;
  }

  // Handle coordinate object
  if (typeof focalPoint === 'object' && 'x' in focalPoint && 'y' in focalPoint) {
    return `focal=${focalPoint.x}x${focalPoint.y}`;
  }

  return '';
};

function getCorrectFocalPoint(
  imgWidth: number,
  imgHeight: number,
  croppedWidth: number,
  croppedHeight: number,
  focalX: number,
  focalY: number
) {
  // Calculate the scale factor as used by object-fit: cover
  const scale = Math.max(croppedWidth / imgWidth, croppedHeight / imgHeight);

  // Calculate the scaled image dimensions
  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  // Determine how much extra image is present (i.e. what gets cropped)
  const extraX = scaledWidth - croppedWidth;
  const extraY = scaledHeight - croppedHeight;

  // Default to centering (50% 50%) in case no cropping occurs on an axis
  let posX = 0.5;
  let posY = 0.5;

  // console.log({ extraX, extraY });

  // If there is horizontal cropping, compute the CSS percentage
  if (extraX > 0) {
    // Calculate how far the focal point is from the center of the container in the scaled image
    const offsetX = focalX * scaledWidth - croppedWidth / 2;
    posX = offsetX / extraX;
    // Clamp the value between 0.0 and 1.0
    posX = Math.max(0, Math.min(1, posX));
  }

  // If there is vertical cropping, compute the CSS percentage
  if (extraY > 0) {
    const offsetY = focalY * scaledHeight - croppedHeight / 2;
    posY = offsetY / extraY;
    posY = Math.max(0, Math.min(1, posY));
  }

  // Return the CSS object-position value as a string
  return `${posX}x${posY}`;
}
