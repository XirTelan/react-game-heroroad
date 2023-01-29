import React from 'react';
import logo from '../../assets/TilesetWall_1.png';
import logo2 from '../../img/TX Tileset Grass.png';
import logo3 from '../../assets/TX Tileset Wall.png';
import { levelVisual } from '../../data/level';

const cellsVisual: string[] = [logo, logo2, logo3];

export const handleCellVisual = (i: number, j: number) => {
  const tileId = levelVisual[i][j];
  return cellsVisual[tileId];
};
