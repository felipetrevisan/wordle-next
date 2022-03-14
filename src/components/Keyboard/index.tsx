import React, { useEffect } from 'react';

import { getStatuses } from '@/utils/statuses';
import KeyButton from './KeyButton';

type KeyboardProps = {
  isRevealing: boolean;
  guesses: string[];
  onTyping: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

const Keyboard: React.FC<KeyboardProps> = ({
  isRevealing,
  guesses,
  onTyping,
  onEnter,
  onDelete,
}) => {
  const buttonStatus = getStatuses(guesses);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onTyping(key);
        }
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onEnter, onDelete, onTyping]);

  const onClick = (value: string) => {
    if (value === 'Enter') {
      onEnter();
    } else if (value === 'Delete') {
      onDelete();
    } else {
      onTyping(value);
    }
  };

  return (
    <div className="grid grid-cols-20 gap-1 auto-rows-3em justify-center">
      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
        <KeyButton
          value={key}
          key={key}
          isRevealing={isRevealing}
          status={buttonStatus[key]}
          onClick={onClick}
        />
      ))}
      <div className="space" />
      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
        <KeyButton
          value={key}
          key={key}
          isRevealing={isRevealing}
          status={buttonStatus[key]}
          onClick={onClick}
        />
      ))}
      <div className="space" />
      <KeyButton value="Enter" large onClick={onClick} />
      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
        <KeyButton
          value={key}
          key={key}
          isRevealing={isRevealing}
          status={buttonStatus[key]}
          onClick={onClick}
        />
      ))}
      <KeyButton value="Delete" large onClick={onClick} />
    </div>
  );
};

export default Keyboard;
