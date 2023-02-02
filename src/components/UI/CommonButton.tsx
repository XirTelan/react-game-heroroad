import React from 'react';

export const CommonButton = ({ title, onClick }: CommonButtonProps) => {
  return (
    <button
      className="rounded p-2 text-white hover:bg-white  hover:bg-opacity-10 disabled:text-slate-600 disabled:hover:bg-opacity-0"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">{title}</div>
    </button>
  );
};

type CommonButtonProps = {
  title: string;
  onClick: () => void;
};
