import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { GameModes } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fieldSlice } from '../../store/reducers/fieldSlice';
import { gameSlice } from '../../store/reducers/gameSlice';
import { heroSlice } from '../../store/reducers/heroSlice';
import { getScrollPos, isInViewRange } from '../../utils';
import { Header } from '../UI/Header';
import Cell from './Cell';
import logo2 from '../../img/TX Tileset Grass.png';

export default function Field() {
  const { gameMode } = useAppSelector((state) => state.game);
  const { changeGameMode } = gameSlice.actions;
  const { field, fogOfWar } = useAppSelector((state) => state.field);

  const { heroPos } = useAppSelector((state) => state.hero);
  const { clearFieldCell, updateFogField } = fieldSlice.actions;
  const dispatch = useAppDispatch();
  const { changePosition, gainGold, getDamage, restoreHp } = heroSlice.actions;

  const fieldWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(updateFogField(updateFogOfWar(fogOfWar, heroPos)));
    getScrollPos(heroPos.x, heroPos.y, fieldWindow);
  }, [heroPos]);

  function updateFogOfWar(field: boolean[][], heroPos: PositionCoord) {
    const newField = field.map((row, i) =>
      row.map((cell, j) => {
        if (cell) return true;
        if (isInViewRange(i, j, heroPos.x, heroPos.y)) {
          return true;
        }
        return false;
      })
    );
    return newField;
  }

  function handleMoveClick(i: number, j: number, cellType: CellTypes) {
    switch (cellType) {
      case CellTypes.Pass:
        if (isInViewRange(i, j, heroPos.x, heroPos.y) && field[i][j] !== 0)
          moveToPos(i, j);
        break;
      case CellTypes.Enemy:
        moveToPos(i, j);
        dispatch(changeGameMode(GameModes.Battle));
        break;
      case CellTypes.Trap:
        moveToPos(i, j);
        dispatch(getDamage(90));
        dispatch(clearFieldCell({ x: i, y: j }));

        break;
      case CellTypes.Potion:
        moveToPos(i, j);
        dispatch(restoreHp(100));
        dispatch(clearFieldCell({ x: i, y: j }));

        break;
      case CellTypes.Gold:
        moveToPos(i, j);
        dispatch(gainGold(100));
        dispatch(clearFieldCell({ x: i, y: j }));
        break;
      case CellTypes.Win:
        dispatch(changeGameMode(GameModes.Win));
        break;
    }
  }
  function moveToPos(i: number, j: number) {
    dispatch(changePosition({ x: i, y: j }));
  }
  return (
    <div className="flex flex-col rounded  bg-white bg-opacity-5 p-2 ">
      <Header title="FIELD" />
      <div
        ref={fieldWindow}
        className=" flex max-h-[800px] max-w-[800px]  overflow-hidden rounded border   "
      >
        <div className="relative  flex  flex-col  ">
          {field.map((row, i) => (
            <div key={i} className="row flex">
              {row.map((cell, j) => (
                <>
                  <Cell
                    key={j}
                    i={i}
                    j={j}
                    cellType={cell}
                    heroPos={heroPos}
                    isVisible={fogOfWar[i][j]}
                    handleMoveClick={handleMoveClick}
                  />
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export enum CellTypes {
  Wall,
  Pass,
  Enemy,
  Question,
  Gold,
  Potion,
  Trap,
  Win = 9,
}
