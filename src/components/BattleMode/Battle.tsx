import React, { useEffect, useRef, useState } from 'react';
import Bar from './Bar';
import InfoPanel from './InfoPanel';
import data from '../../data/database.json';
import { GameModes } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fieldSlice } from '../../store/reducers/fieldSlice';
import { heroSlice, StatsType } from '../../store/reducers/heroSlice';
import { gameSlice } from '../../store/reducers/gameSlice';
import { wait } from '../../utils';
import { useAbility } from '../../hooks/useAbility';
import { ActionButton } from '../UI/ActionButton';
import {
  GiHealthNormal,
  GiShield,
  GiSandsOfTime,
  GiSwordWound,
} from 'react-icons/gi';
import { useJournal } from '../../hooks/useJournal';

export default function Battle() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const hero = useAppSelector((state) => state.hero);
  const attackAnimationRef = useRef<HTMLInputElement>(null);
  const [enemy, setEnemy] = useState(() => createEnemy(data.enemies[0]));
  const { clearFieldCell } = fieldSlice.actions;
  const { changeGameMode } = gameSlice.actions;
  const { getDamage } = heroSlice.actions;

  const defendAbility = useAbility(5, isPlayerTurn);
  const healAbility = useAbility(3, isPlayerTurn);
  const journal = useJournal();
  const journalMessEndRef = useRef<HTMLInputElement>(null);

  const { gainExp } = heroSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (enemy.hpCurrent <= 0) getBattleResults('win');
    if (hero.hpCurrent <= 0) getBattleResults('lose');
  }, [enemy, hero.hpCurrent]);

  useEffect(() => {
    console.log('next Turn:', isPlayerTurn ? 'player' : 'enemy');
    if (isPlayerTurn) return;
    enemyDesision();
  }, [isPlayerTurn]);

  useEffect(() => {
    journalMessEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [journal.messages]);

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
  async function attackAnimation() {
    attackAnimationRef.current?.classList.toggle('active');
  }
  async function enemyDesision() {
    console.log('Enemy move');
    makeAction('attack', enemy);
    await wait(1000);
    setIsPlayerTurn(true);
  }

  async function makeAction(action: string, person: Character) {
    if (person == hero && !isPlayerTurn) return;
    if (person == hero) setIsPlayerTurn(false);
    switch (action) {
      case 'attack':
        if (person == hero) {
          attack(hero, enemy);
          attackAnimation();
        } else {
          attack(enemy, hero);
        }
        await wait(1000);
        break;
      case 'defend':
        defendAbility.activate();
        break;
      case 'heal':
        healAbility.activate();
        dispatch(heroSlice.actions.restoreHp(20));
        break;
    }
  }

  function attack(src: Character, dst: Character) {
    console.log('triggered', src.name, dst.name);
    let currentHp = dst.hpCurrent;
    const newHp = (currentHp -= src.baseDmg);
    console.log(isPlayerTurn);
    journal.addMessage(`${src.name} attack  ${dst.name} Deal:${src.baseDmg}`);
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
              <div className=" absolute top-1/2 right-1/4 h-2  w-60 rotate-45  overflow-hidden">
                <div
                  ref={attackAnimationRef}
                  className={`slice    h-1 w-full bg-white`}
                ></div>
              </div>
            </div>
            <div className="mx-3  mb-3 flex flex-col  rounded bg-black bg-opacity-90">
              <div className="flex bg-white bg-opacity-5">
                <div className="relative flex min-w-[10rem] flex-col p-3 text-white">
                  <ActionButton
                    title="Attack"
                    isAvailable={true}
                    cdRemain={0}
                    onClick={() => makeAction('attack', hero)}
                    icon={<GiSwordWound />}
                  />
                  <ActionButton
                    title="Heal"
                    isAvailable={healAbility.isAvailable()}
                    cdRemain={healAbility.cdCurrent}
                    onClick={() => makeAction('heal', hero)}
                    icon={<GiHealthNormal />}
                  />
                  <ActionButton
                    title="Defend"
                    isAvailable={defendAbility.isAvailable()}
                    cdRemain={defendAbility.cdCurrent}
                    onClick={() => makeAction('defend', hero)}
                    icon={<GiShield />}
                  />
                  {!isPlayerTurn && (
                    <div className="absolute inset-0 flex content-center justify-center rounded bg-black bg-opacity-70">
                      <p className=" self-center ">
                        <GiSandsOfTime />
                      </p>
                    </div>
                  )}
                </div>
                <div className="m-3 flex grow gap-1 rounded">
                  <div className="relative  grow  rounded border border-white bg-white  bg-opacity-10 p-1">
                    <div className=" absolute -top-3 right-1/2 rounded    border border-white bg-black  p-2  text-white">
                      Journal
                    </div>
                    <div className=" max-h-[120px] overflow-auto p-1 text-slate-50 ">
                      {journal.messages.map((msg, indx) => (
                        <div key={indx}>{msg}</div>
                      ))}
                      <div ref={journalMessEndRef} />
                    </div>
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
