import React from 'react';

import CurrentTile from '../Tiles/Current/index';
import CompletedTile from '../Tiles/Completed/index';
import EmptyTile from '../Tiles/Empty/index';
import { MAX_CHALLENGES } from '@/config/settings';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  isRevealing?: boolean;
  currentTileClass: string;
  readOnly?: boolean;
};

const Grid: React.FC<GridProps> = ({
  guesses,
  currentGuess,
  isRevealing,
  currentTileClass,
}) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : [];

  return (
    <div className="grid justify-center items-center flex-grow gap-2 grid-cols-board grid-rows-board">
      {guesses.map((guess, index) => (
        <CompletedTile
          key={index}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === index}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentTile guess={currentGuess} className={currentTileClass} />
      )}
      {empties.map((_, i) => (
        <EmptyTile key={i} />
      ))}
    </div>
  );
};

export default Grid;
