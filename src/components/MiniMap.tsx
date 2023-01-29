import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Header } from './Header';

export default function MiniMap() {
  const { field, fogOfWar } = useAppSelector((state) => state.field);
  const heroPos = useAppSelector((state) => state.hero.heroPos);

  const isVisibleCell = (i: number, j: number) => {
    return fogOfWar[i][j];
  };

  const getCellColor = (celltype: number) => {
    return CellTypesColor[celltype];
  };
  const isHeroPosCell = (x: number, y: number) => {
    return heroPos.x === x && heroPos.y === y;
  };

  return (
    <div className="ml-4 bg-white bg-opacity-5 p-2 rounded">
      <Header title="MINIMAP" />
      {field.map((row, i) => (
        <div key={i} className="flex ">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`h-1 w-1 xl:h-3 xl:w-3  ${
                isVisibleCell(i, j)
                  ? isHeroPosCell(i, j)
                    ? 'animate-pulse bg-white'
                    : getCellColor(cell)
                  : 'bg-black  '
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

enum CellTypesColor {
  'bg-red-100',
  'bg-red-200',
  'bg-red-300',
  'bg-red-400',
  'bg-yellow-300',
  'bg-red-600',
  'bg-red-700',
  'bg-red-800',
  'bg-red-900 ',
  'bg-green-400 ',
}
