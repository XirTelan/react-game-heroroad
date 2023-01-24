import React from 'react';
import { useAppSelector } from '../hooks/redux';
import Bar from './BattleMode/Bar';
import { Header } from './Header';

export default function CharacterInfo() {
  const hero = useAppSelector((state) => state.hero);
  return (
    <div className=" mr-3 rounded bg-white bg-opacity-5 p-4">
      <Header title="Character stats" />
      <div className=" font-bold">Name: {hero.name}</div>
      <div className=" text-xs">Level: {hero.level}</div>
      <div>
        <Bar maxValue={hero.hpMax} currentValue={hero.hpCurrent} />
      </div>
      <div>Attack: {hero.baseDmg}</div>
      <div>Gold: {hero.gold}</div>
    </div>
  );
}
