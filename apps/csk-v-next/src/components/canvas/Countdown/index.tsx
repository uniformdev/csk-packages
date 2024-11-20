'use client';
import { FC, useState, useEffect, useMemo } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { TextProps as BaseTextProps } from '@/components/ui/Text';
import { ViewPort } from '@/types';
import { cn, resolveViewPort } from '@/utils';

enum CountdownUnit {
  Days = 'days',
  Hours = 'hours',
  Minutes = 'minutes',
  Seconds = 'seconds',
}

const UNITS_TO_SHOW = [CountdownUnit.Days, CountdownUnit.Hours, CountdownUnit.Minutes, CountdownUnit.Seconds];

type UniformDate = {
  datetime: string;
};

export type CountdownParams = {
  targetDate?: UniformDate;
  backgroundColor?: string;
  textColor?: string;
  border?: string | ViewPort<string>;
  size?: BaseTextProps['size'];
};

enum CountdownSlots {
  CountdownComplete = 'countdownComplete',
}

export enum CountdownVariants {
  LabelsUnder = 'labelsUnder',
}

export type CountdownProps = ComponentProps<CountdownParams, CountdownSlots>;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY;

const formatTime = (targetDate?: UniformDate) => {
  const endDate = new Date(targetDate?.datetime ?? 0).getTime();
  const now = new Date().getTime();
  const timeDifference = Math.max(Math.floor((endDate - now) / MILLISECONDS_IN_SECOND), 0);
  const seconds = Math.floor(timeDifference % SECONDS_IN_MINUTE);
  const minutes = Math.floor((timeDifference / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR);
  const hours = Math.floor((timeDifference / SECONDS_IN_HOUR) % HOURS_IN_DAY);
  const days = Math.floor(timeDifference / SECONDS_IN_DAY);

  return {
    days,
    hours,
    minutes,
    seconds,
    timeDifference,
  };
};

const renderNumberList = ({
  maxUnitsCount,
  currentTime,
  unit,
  isAlignEnd,
}: {
  maxUnitsCount: number;
  currentTime: number;
  unit: CountdownUnit;
  isAlignEnd?: boolean;
}) => (
  <div className="relative mx-auto h-[1.25em] w-[1.75em] overflow-hidden">
    <div
      className="absolute transition-transform duration-500 ease-in-out"
      style={{ transform: `translateY(-${currentTime * 1.25}em)` }}
    >
      {Array.from(
        // NOTE: Plus one since counting starts from 0
        {
          length: maxUnitsCount + 1,
        },
        (_, unitNumber) => (
          <div
            key={`${unit}-${unitNumber}`}
            className={cn('flex h-[1.25em] w-[1.75em] justify-center', {
              ['items-end']: isAlignEnd,
              ['items-center']: !isAlignEnd,
            })}
          >
            {unitNumber < 10 ? `0${unitNumber}` : unitNumber}
          </div>
        )
      )}
    </div>
  </div>
);

const Countdown: FC<CountdownProps> = ({
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
        <div
          className={cn('flex gap-5 flex-wrap flex-col sm:flex-row', {
            [`text-${textColor}`]: textColor,
          })}
        >
          {UNITS_TO_SHOW.map(unit => {
            if (time[unit] === 0 && unit === CountdownUnit.Days) return null;

            const currentTime = time[unit];

            return (
              <div
                key={unit}
                className={cn('flex w-fit p-4 text-center gap-2 items-end leading-none', {
                  'flex-col': component.variant === CountdownVariants.LabelsUnder,
                  [`bg-${backgroundColor}`]: !!backgroundColor,
                  [resolveViewPort(border, '{value}')]: border,
                  ['items-center']: border,
                  [resolveViewPort(size, 'text-{value}')]: !!size,
                  [resolveViewPort(border, '{value}')]: !!border,
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

export default Countdown;
