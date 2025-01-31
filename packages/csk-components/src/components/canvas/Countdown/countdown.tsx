'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { CountdownProps, CountdownVariants } from '.';
import { CountdownUnit } from './constants';
import { getTextClass, getUnitClass } from './style-utils';
import { formatTime, renderNumberList } from './utils';

const UNITS_TO_SHOW = [CountdownUnit.Days, CountdownUnit.Hours, CountdownUnit.Minutes, CountdownUnit.Seconds];

export const Countdown: FC<CountdownProps> = ({
  targetDate,
  backgroundColor,
  textColor,
  border,
  size,
  component,
  context,
  slots,
}) => {
  const [{ timeDifference, ...time }, setTime] = useState(formatTime(targetDate));

  const memoizedMaxUnitsCount = useMemo(() => {
    const { days } = formatTime(targetDate);

    return {
      [CountdownUnit.Seconds]: 59,
      [CountdownUnit.Minutes]: 59,
      [CountdownUnit.Hours]: 23,
      [CountdownUnit.Days]: days,
    };
  }, [targetDate]);

  useEffect(() => {
    if (timeDifference > 0) {
      const timer = setInterval(() => {
        setTime(formatTime(targetDate));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [targetDate, timeDifference]);

  return (
    <div>
      {timeDifference ? (
        <div className={getTextClass({ textColor })}>
          {UNITS_TO_SHOW.map(unit => {
            if (time[unit] === 0 && unit === CountdownUnit.Days) return null;

            const currentTime = time[unit];

            return (
              <div
                key={unit}
                className={getUnitClass({
                  variant: component.variant as CountdownVariants,
                  backgroundColor,
                  border,
                  size,
                })}
              >
                <div className="mx-auto">
                  {renderNumberList({
                    maxUnitsCount: memoizedMaxUnitsCount[unit],
                    currentTime,
                    unit,
                    isAlignEnd: !border,
                  })}
                </div>
                <div className="mx-auto" style={{ fontSize: '0.5em' }}>
                  {unit}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <UniformSlot data={component} context={context} slot={slots.countdownComplete} />
      )}
    </div>
  );
};
