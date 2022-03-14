import React from 'react';

import { MAX_WORD_LENGTH } from '@/config/settings';

import Tile from '../index';

const EmptyTile = () => {
  const emptyTiles = Array.from(Array(MAX_WORD_LENGTH));

  return (
    <>
      {emptyTiles.map((_, i) => (
        <Tile key={i} />
      ))}
    </>
  );
};

export default EmptyTile;
