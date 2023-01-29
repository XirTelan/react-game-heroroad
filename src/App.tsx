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
import { ModalView } from './components/ModalView';

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
        <div className="flex min-h-screen items-center  justify-center ">
          {gameMode == GameModes.Win && <GameEnd isWin={true} />}
          {gameMode == GameModes.GameOver && <GameEnd isWin={false} />}
          <div className="flex ">
            <div className="text-white ">
              <CharacterInfo />
            </div>
            <Field />
            {gameMode === GameModes.Battle && (
              <>
                <ModalView>
                  <Battle />
                </ModalView>
              </>
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
