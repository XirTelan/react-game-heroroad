import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
export default function Bar(props: barProps) {
  const { maxValue, currentValue } = props;

  return (
    <div className="flex items-center">
      <div className=" mr-3 text-rose-500">
        <AiFillHeart />
      </div>
      <div className="relative h-5 w-40 ">
        <div className=" h-5 w-full bg-slate-800"></div>
        <div
          className={`absolute top-0 left-0 h-5 max-w-full bg-rose-400 transition-all duration-500 ease-in`}
          style={{
            width: `${(currentValue / maxValue) * 100}%`,
          }}
        ></div>
        <div className="absolute top-0 left-0 right-0 flex max-h-full justify-center text-black">
          <span className="flex items-center font-bold text-white">
            {currentValue} / {maxValue}
          </span>
        </div>
      </div>
    </div>
  );
}

type barProps = {
  maxValue: number;
  currentValue: number;
};
