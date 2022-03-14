import React from 'react';

import clsx from 'clsx';

import { Status } from '@/utils/statuses';
import { REVEAL_TIME_MS } from '@/config/settings';

type TilesProps = {
  value?: string;
  status?: Status;
  isRevealing?: boolean;
  isCompleted?: boolean;
  position?: number;
  className?: string;
  readOnly?: boolean;
};

const Tiles: React.FC<TilesProps> = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  className,
  readOnly,
}) => {
  const isFilled = value && !isCompleted;
  const shouldReveal = isRevealing && isCompleted;
  const animationDelay = `${position * REVEAL_TIME_MS}ms`;

  const classes = clsx(
    `flex justify-center items-center border-slate-700 border-2 text-4xl leading-loose text-white font-bold before:inline-block before:pb-1/1 ${className}`,
    {
      'bg-white dark:bg-slate-900 border-slate-200 border-slate-600': !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct',
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present',
      'tile-scale': isFilled,
      'tile-reveal': shouldReveal,
      'pointer-events-none': readOnly,
    }
  );

  return (
    <div className={classes} style={{ animationDelay }}>
      <div style={{ animationDelay }}>{value}</div>
    </div>
  );
};

export default Tiles;
