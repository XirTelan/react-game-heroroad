import React, { useEffect, useState } from 'react';

import './App.css';
import Battle from './components/BattleMode/Battle';
import CharacterInfo from './components/CharacterInfo';
import Field from './components/ExploreMode/Field';
import MiniMap from './components/MiniMap';
import GameEnd from './components/GameEnd';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { heroSlice } from './store/reducers/heroSlice';
import { gameSlice } from './store/reducers/gameSlice';

function App() {
  const { gameMode } = useAppSelector((state) => state.game);
  const { level, hpMax, hpCurrent } = useAppSelector((state) => state.hero);
  const [isInit, setIsInit] = useState(true);
  const actions = heroSlice.actions;
  const { changeGameMode } = gameSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Use effect', isInit);
    if (!isInit) dispatch(actions.restoreHp(hpMax));
    setIsInit(false);
  }, [level]);

  useEffect(() => {
    if (hpCurrent <= 0) {
      dispatch(changeGameMode(GameModes.GameOver));
    }
    console.log('Game mode?', gameMode);
  }, [hpCurrent]);

  return (
    <>
      <div className="App  ">
        <div className="flex h-screen items-center  justify-center ">
          {gameMode == GameModes.Win && <GameEnd isWin={true} />}
          {gameMode == GameModes.GameOver && <GameEnd isWin={false} />}
          <div className="flex ">
            <div className="text-white ">
              <CharacterInfo />
            </div>
            <Field />
            {gameMode === GameModes.Battle && (
              <div className="absolute inset-0 flex h-full w-full flex-col items-center bg-black bg-opacity-60 ">
                <div className="absolute top-10 text-4xl font-bold text-white ">
                  BATTLE
                </div>
                <Battle />
              </div>
            )}
            <div className="text-white ">
              <MiniMap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export enum GameModes {
  Explore,
  Battle,
  Win,
  GameOver,
}

export default App;
