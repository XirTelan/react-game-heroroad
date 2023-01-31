import React from 'react';
import { GiSandsOfTime } from 'react-icons/gi';

export const ActionButton = (props: ActionButtonProps) => {
  const { title, isAvailable, cdRemain, onClick, icon } = props;
  return (
    <button
      className="rounded p-2 hover:bg-white  hover:bg-opacity-10 disabled:text-slate-600 disabled:hover:bg-opacity-0"
      disabled={!isAvailable}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {title}
        <div className="ml-1 flex items-center rounded bg-white bg-opacity-10 p-1 text-white">
          {!isAvailable ? (
            <>
              <span>{cdRemain}</span>
              <GiSandsOfTime />
            </>
          ) : (
            <>{icon}</>
          )}
        </div>
      </div>
    </button>
  );
};

type ActionButtonProps = {
  title: string;
  isAvailable: boolean;
  cdRemain: number;
  onClick: () => void;
  icon: React.ReactNode;
};
