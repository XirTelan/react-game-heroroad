import React, { SetStateAction, useEffect, useState } from 'react';
import Bar from './Bar';
import InfoPanel from './InfoPanel';
import data from '../../data/database.json';
import { GameModes } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fieldSlice } from '../../store/reducers/fieldSlice';
import { heroSlice } from '../../store/reducers/heroSlice';
import { gameSlice } from '../../store/reducers/gameSlice';

export default function Battle() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const hero = useAppSelector((state) => state.hero);

  const [enemy, setEnemy] = useState(() => createEnemy(data.enemies[0]));
  const { clearFieldCell } = fieldSlice.actions;
  const { changeGameMode } = gameSlice.actions;
  const { gainExp } = heroSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (enemy.hpCurrent <= 0) getBattleResults('win');
    if (hero.hpCurrent <= 0) getBattleResults('lose');
  }, [enemy, hero.hpCurrent]);

  function createEnemy(data: any) {
    return {
      id: data.id,
      name: data.name,
      baseDmg: data.baseDmg,
      hpCurrent: data.hpMax,
      hpMax: data.hpMax,
      level: data.level,
    } as Character;
  }
  function getBattleResults(result: 'win' | 'lose') {
    switch (result) {
      case 'win':
        dispatch(clearFieldCell(hero.heroPos));
        dispatch(gainExp(enemy.level * 56));
        dispatch(changeGameMode(GameModes.Explore));
        break;
      case 'lose':
        break;
    }
  }

  function makeAction(action: string) {
    if (!isPlayerTurn) return;
    switch (action) {
      case 'attack':
        attack(hero, enemy);
        setIsPlayerTurn(false);
        break;
    }
  }

  function attack(src: Character, dst: Character) {
    const newHp = (dst.hpCurrent -= src.baseDmg);
    console.log(dst);
    setEnemy({ ...dst, hpCurrent: newHp });
  }

  console.log(enemy);
  return (
    <>
      <div className="container z-10 m-auto flex max-h-[800px] max-w-[800px] flex-col    overflow-hidden ">
        <div className="absolute top-10 right-0 left-0 flex w-full justify-center text-4xl font-bold text-white ">
          <span>BATTLE</span>
        </div>
        <div
          className=" h-full w-full rounded"
          style={{
            backgroundImage: '',
            background: 'url("https://via.placeholder.com/900x300")',
          }}
        >
          <div className="flex h-full flex-col justify-between ">
            <div className="top-0 flex w-full justify-between ">
              <InfoPanel {...hero} />
              <div>{isPlayerTurn ? 'Player Turn' : 'Enemy turn'}</div>
              <InfoPanel {...enemy} />
            </div>
            <div className="h-[300px]"></div>
            <div className="mx-3  mb-3 flex flex-col  rounded bg-black bg-opacity-90">
              <div className="flex bg-white bg-opacity-5">
                <div className="flex flex-col p-3 text-white">
                  <button
                    className="rounded p-2 hover:bg-white hover:bg-opacity-10"
                    onClick={() => attack(hero, enemy)}
                  >
                    Attack
                  </button>
                  <button
                    className="rounded p-2 hover:bg-white hover:bg-opacity-10"
                    onClick={() => attack(hero, enemy)}
                  >
                    Defend
                  </button>
                </div>
                <div className="m-3 flex grow gap-1 rounded">
                  <div className="relative grow bg-white  bg-opacity-10 p-1">
                    <div className=" absolute -top-3 right-1/2 rounded bg-black p-1  text-white">
                      Skills
                    </div>
                    <div>Fire</div>
                  </div>
                  <div className="relative grow bg-white  bg-opacity-10 p-1">
                    <div className=" absolute -top-3 right-1/2 rounded bg-black p-1  text-white">
                      Items
                    </div>
                    <div>Fire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>Battle</div>
      </div>
    </>
  );
}
