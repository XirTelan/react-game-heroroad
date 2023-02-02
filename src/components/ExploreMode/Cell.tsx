import React from 'react';
import { IconContext } from 'react-icons';

import { BsQuestionSquareFill } from 'react-icons/bs';
import { TbSwords } from 'react-icons/tb';
import { IoFootstepsSharp } from 'react-icons/io5';
import { isInViewRange } from '../../utils';
import { CellTypes } from './Field';
import { handleCellVisual } from './handleCellVisual';
export default function Cell(props: cellProps) {
  const { i, j, cellType, isVisible, heroPos, handleMoveClick } = props;
  function getCellData(cell: CellTypes) {
    switch (cell) {
      case CellTypes.Pass:
        if (isReacheable()) return <IoFootstepsSharp />;
        break;
      case CellTypes.Enemy:
        return <TbSwords />;
      case CellTypes.Trap:
        return <div>Trap</div>;
      case CellTypes.Win:
        return <div>Win</div>;
      default:
        return <div></div>;
    }
  }

  const isReacheable = () => {
    return (
      isInViewRange(i, j, heroPos.x, heroPos.y) &&
      (i === heroPos.x || j == heroPos.y) &&
      !(i === heroPos.x && j == heroPos.y)
    );
  };

  return (
    <div
      key={j}
      className={` relative flex h-16 w-16  ${
        isReacheable() && cellType != 0
          ? 'cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-10'
          : ''
      }`}
      onClick={() => {
        if (isReacheable()) handleMoveClick(i, j, cellType);
      }}
    >
      {isVisible && (
        <>
          <div className="absolute inset-0 ">
            <img src={handleCellVisual(i, j)} alt="" />
          </div>
          {heroPos.x == i && heroPos.y == j ? (
            <span className=" z-[1] flex-1 text-white">Hero</span>
          ) : (
            <IconContext.Provider value={{ color: 'white', size: '64' }}>
              <div
                className={` z-[1] flex-1 ${
                  isReacheable() && cellType != 0
                    ? 'cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-10'
                    : ''
                } `}
              >
                {getCellData(cellType)}
              </div>
            </IconContext.Provider>
          )}
        </>
      )}
    </div>
  );
}

type cellProps = {
  i: number;
  j: number;
  cellType: number;
  heroPos: PositionCoord;
  isVisible: boolean;
  handleMoveClick: (i: number, j: number, cellType: number) => void;
};
