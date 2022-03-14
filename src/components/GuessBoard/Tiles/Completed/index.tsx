import React from 'react';

import Tile from '../index';
import { unicodeSplit } from '@/utils/words';
import { getGuessStatuses } from '@/utils/statuses';

type CompletedTileProps = {
  guess: string;
  isRevealing?: boolean;
};

const CompletedTile: React.FC<CompletedTileProps> = ({
  guess,
  isRevealing,
}) => {
  const statuses = getGuessStatuses(guess);
  const splitGuess = unicodeSplit(guess);

  return (
    <>
      {splitGuess.map((letter, i) => (
        <Tile
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </>
  );
};

export default CompletedTile;
