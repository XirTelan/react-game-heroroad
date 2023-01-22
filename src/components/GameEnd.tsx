import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { fieldSlice } from '../store/reducers/fieldSlice';
import { gameSlice } from '../store/reducers/gameSlice';
import { heroSlice } from '../store/reducers/heroSlice';

export default function GameEnd(props: GameEndProps) {
  const dispatch = useAppDispatch();
  const resetHeroStats = heroSlice.actions.startNewGame;
  const resetField = fieldSlice.actions.startNewGame;
  const resetGameMode = gameSlice.actions.startNewGame;

  const startNewGame = () => {
    dispatch(resetHeroStats());
    dispatch(resetField());
    dispatch(resetGameMode());
  };

  return (
    <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center bg-black ">
      <div className="mb-4 text-6xl text-white ">
        You&apos;re {props.isWin ? 'win' : 'lose'}
      </div>
      <div>
        <button
          className="rounded bg-white p-4 hover:bg-opacity-60"
          onClick={startNewGame}
        >
          Start new game
        </button>
      </div>
    </div>
  );
}

type GameEndProps = {
  isWin: boolean;
};
