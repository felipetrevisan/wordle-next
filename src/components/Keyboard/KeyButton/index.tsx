import React from 'react';

import clsx from 'clsx';

import { Status } from '@/utils/statuses';

type KeyButtonProps = {
  value: string;
  large?: boolean;
  status?: Status;
  isRevealing?: boolean;
  onClick: (value: string) => void;
};

const KeyButton: React.FC<KeyButtonProps> = ({
  value,
  large,
  status,
  isRevealing,
  onClick,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button
      className={clsx(
        'text-gray-50 rounded uppercase select-none focus:outline-none focus:shadow-outline',
        {
          'col-span-3': large,
          'col-span-2': !large,
          'transition ease-in-out': isRevealing,
          'bg-slate-800  dark:bg-slate-600 hover:bg-slate-800 active:bg-slate-400':
            !status,
          'bg-slate-400 dark:bg-slate-800 text-white': status === 'absent',
          'bg-green-500 hover:bg-green-800 active:bg-green-500 text-white':
            status === 'correct',
          'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
            status === 'present',
        }
      )}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default KeyButton;
