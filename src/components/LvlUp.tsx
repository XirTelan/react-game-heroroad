import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useToggle } from '../hooks/useToggle';
import { heroSlice, StatsType } from '../store/reducers/heroSlice';
import { CommonButton } from './UI/CommonButton';

export const LvlUp = () => {
  const { upgradeStats } = heroSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="mb-1 block text-center text-white">Select Upgrade</div>
      <div className="flex flex-col gap-1 rounded bg-white bg-opacity-10 p-4">
        <CommonButton
          title={'Attack +5'}
          onClick={() => dispatch(upgradeStats(StatsType.Attack))}
        />
        <CommonButton
          title={'Defense +5'}
          onClick={() => dispatch(upgradeStats(StatsType.Defense))}
        />
        <CommonButton
          title={'Max Hp +10'}
          onClick={() => dispatch(upgradeStats(StatsType.Hp))}
        />
      </div>
    </div>
  );
};
