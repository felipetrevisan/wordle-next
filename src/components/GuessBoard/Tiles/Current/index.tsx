import React from 'react';

import Tile from '../index';
import { unicodeSplit } from '@/utils/words';
import { MAX_WORD_LENGTH } from '@/config/settings';

type CurrentTileProps = {
  guess: string;
  className: string;
};

const CurrentTile: React.FC<CurrentTileProps> = ({ guess, className }) => {
  const splitGuess = unicodeSplit(guess);
  const emptyTiles = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));

  return (
    <>
      {splitGuess.map((letter, i) => (
        <Tile key={i} value={letter} className={className} />
      ))}
      {emptyTiles.map((_, i) => (
        <Tile key={i} />
      ))}
    </>
  );
};

export default CurrentTile;
