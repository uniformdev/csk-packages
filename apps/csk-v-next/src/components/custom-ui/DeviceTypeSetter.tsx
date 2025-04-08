'use client';

import { useEffect } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';

enum DeviceType {
  MOBILE = 'm',
  TABLET = 't',
  DESKTOP = 'd',
}

const DEVICE_RESOLUTION = {
  [DeviceType.MOBILE]: 360,
  [DeviceType.TABLET]: 768,
  [DeviceType.DESKTOP]: 1280,
};

const determineDeviceType = (width: number): DeviceType => {
  if (width < DEVICE_RESOLUTION[DeviceType.TABLET]) {
    return DeviceType.MOBILE;
  } else if (width < DEVICE_RESOLUTION[DeviceType.DESKTOP]) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
};

export const DeviceTypeSetter = () => {
  const { context } = useUniformContext();

  const deviceType = DeviceType.DESKTOP;

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const deviceType = determineDeviceType(width);
      context?.update({
        quirks: { deviceType },
      });
    };

    updateDeviceType();

    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, [context, deviceType]);

  return null;
};
