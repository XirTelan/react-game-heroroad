import React, { SetStateAction, useEffect, useState } from 'react';
import Bar from './Bar';
import InfoPanel from './InfoPanel';
import data from '../../data/database.json';
import { GameModes } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fieldSlice } from '../../store/reducers/fieldSlice';
import { heroSlice } from '../../store/reducers/heroSlice';
import { gameSlice } from '../../store/reducers/gameSlice';
import { wait } from '../../utils';
import { useAbility } from '../../hooks/useAbility';
import { ActionButton } from '../UI/ActionButton';
import { GiHealthNormal, GiShield } from 'react-icons/gi';
import { useJournal } from '../../hooks/useJournal';

export default function Battle() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const hero = useAppSelector((state) => state.hero);

  const [enemy, setEnemy] = useState(() => createEnemy(data.enemies[0]));
  const { clearFieldCell } = fieldSlice.actions;
  const { changeGameMode } = gameSlice.actions;
  const { getDamage } = heroSlice.actions;
  const defendAbility = useAbility(5, isPlayerTurn);
  const healAbility = useAbility(3, isPlayerTurn);
  const journal = useJournal();
  const { gainExp } = heroSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (enemy.hpCurrent <= 0) getBattleResults('win');
    if (hero.hpCurrent <= 0) getBattleResults('lose');
  }, [enemy, hero.hpCurrent]);

  useEffect(() => {
    console.log('next Turn:', isPlayerTurn ? 'player' : 'enemy');
    if (isPlayerTurn) return;
    attack(enemy, hero);
    setIsPlayerTurn(true);
  }, [isPlayerTurn]);

  function createEnemy(data: any) {
    return {
      id: data.id,
      name: data.name,
      baseDmg: data.baseDmg,
      defense: data.defense,
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

  async function makeAction(action: string) {
    if (!isPlayerTurn) return;
    switch (action) {
      case 'attack':
        attack(hero, enemy);
        await wait(1000);
        journal.addMessage('Hero attack undead');
        setIsPlayerTurn(false);
        break;
      case 'defend':
        defendAbility.activate();
        setIsPlayerTurn(false);
        break;
      case 'heal':
        healAbility.activate();
        dispatch(heroSlice.actions.restoreHp(20));
        setIsPlayerTurn(false);
        break;
    }
  }

  function attack(src: Character, dst: Character) {
    console.log('triggered', src.name, dst.name);
    let currentHp = dst.hpCurrent;
    const newHp = (currentHp -= src.baseDmg);
    console.log(isPlayerTurn);
    isPlayerTurn
      ? setEnemy({ ...dst, hpCurrent: newHp })
      : dispatch(getDamage(src.baseDmg));
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
          <div className=" flex h-full flex-col justify-between ">
            <div className="top-0 flex w-full justify-between ">
              <InfoPanel {...hero} />
              <div>{isPlayerTurn ? 'Player Turn' : 'Enemy turn'}</div>
              <InfoPanel {...enemy} />
            </div>
            <div className="relative h-[300px]">
              <div className=" absolute top-1/2 right-1/4 h-2  w-60 rotate-45  overflow-hidden bg-red-700">
                <div className="slice active   h-1 w-full bg-white"></div>
              </div>
            </div>
            <div className="mx-3  mb-3 flex flex-col  rounded bg-black bg-opacity-90">
              <div className="flex bg-white bg-opacity-5">
                <div className="flex min-w-[10rem] flex-col p-3 text-white">
                  <button
                    className="rounded p-2 hover:bg-white hover:bg-opacity-10"
                    onClick={() => makeAction('attack')}
                  >
                    Attack
                  </button>
                  <ActionButton
                    title="Heal"
                    isAvailable={healAbility.isAvailable()}
                    cdRemain={healAbility.cdCurrent}
                    onClick={() => makeAction('heal')}
                    icon={<GiHealthNormal />}
                  />

                  <ActionButton
                    title="Defend"
                    isAvailable={defendAbility.isAvailable()}
                    cdRemain={defendAbility.cdCurrent}
                    onClick={() => makeAction('defend')}
                    icon={<GiShield />}
                  />
                </div>
                <div className="m-3 flex grow gap-1 rounded">
                  <div className="relative grow bg-white  bg-opacity-10 p-1">
                    <div className=" absolute -top-3 right-1/2 rounded bg-black p-1  text-white">
                      Skills
                    </div>
                    <div>Fire</div>
                  </div>
                  <div className="relative max-h-[120px] grow overflow-scroll bg-white  bg-opacity-10 p-1">
                    <div className=" absolute -top-3 right-1/2 rounded bg-black p-1  text-white">
                      Journal
                    </div>
                    {journal.messages.map((msg, indx) => (
                      <div key={indx}>{msg}</div>
                    ))}
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
