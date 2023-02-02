import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { useToggle } from '../hooks/useToggle';
import Bar from './BattleMode/Bar';
import { LvlUp } from './LvlUp';
import { ModalView } from './ModalView';
import { CommonButton } from './UI/CommonButton';
import { Header } from './UI/Header';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { GiBroadsword, GiVibratingShield } from 'react-icons/gi';
export default function CharacterInfo() {
  const hero = useAppSelector((state) => state.hero);
  const { isOpen, toggle } = useToggle();

  useEffect(() => {
    if (hero.avalablePoints === 0 && isOpen) toggle();
  }, [hero.avalablePoints]);

  return (
    <div className=" mr-3 w-60 rounded bg-white bg-opacity-5 p-4">
      <Header title="STATS" />
      <div className="flex justify-between">
        <div>
          <div className=" font-bold">{hero.name}</div>
        </div>
        {hero.avalablePoints > 0 && (
          <div>
            <button onClick={toggle}>
              <div className="flex items-center rounded bg-white bg-opacity-20 px-2">
                <div>LvlUp - {hero.avalablePoints}</div>
                <AiFillStar />
              </div>
            </button>

            {isOpen && (
              <ModalView>
                <LvlUp />
              </ModalView>
            )}
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className=" text-xs">Level: {hero.level}</div>
        <Bar
          height={0.25}
          maxValue={hero.expReq}
          currentValue={hero.expCurrent}
          showNumbers={false}
        />
      </div>
      <div>
        <Bar
          icon={<AiFillHeart />}
          maxValue={hero.hpMax}
          currentValue={hero.hpCurrent}
        />
      </div>
      <div className="mt-1 flex justify-around text-lg">
        <div className="flex items-center">
          <GiBroadsword /> : {hero.baseDmg}
        </div>
        <div className="flex items-center">
          <GiVibratingShield /> : {hero.defense}
        </div>
      </div>
    </div>
  );
}
