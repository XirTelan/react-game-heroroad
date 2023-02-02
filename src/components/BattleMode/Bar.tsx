import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
export default function Bar(props: BarProps) {
  const { maxValue, currentValue, showNumbers, icon, variant, height } = props;

  const barValues = (
    <div className="absolute top-0 left-0 right-0 flex max-h-full justify-center text-black">
      <span className="flex items-center font-bold text-white">
        {currentValue} / {maxValue}
      </span>
    </div>
  );
  return (
    <div className="flex items-center">
      {icon && <div className=" mr-3 text-rose-500">{icon}</div>}
      <div
        className="relative  w-full"
        style={{
          height: `${height}rem`,
        }}
      >
        <div
          className=" w-full bg-slate-800"
          style={{
            height: `${height}rem`,
          }}
        ></div>
        <div
          className={`absolute top-0 left-0   max-w-full bg-rose-400 transition-all duration-500 ease-in`}
          style={{
            width: `${(currentValue / maxValue) * 100}%`,
            height: `${height}rem`,
          }}
        ></div>
        {showNumbers && barValues}
      </div>
    </div>
  );
}

Bar.defaultProps = {
  showNumbers: true,
  height: 1.25,
  variant: 'neutral',
};

type BarProps = {
  maxValue: number;
  currentValue: number;
  showNumbers?: boolean;
  icon?: React.ReactNode;
  variant?: 'neutral' | 'red';
  height?: number;
};
