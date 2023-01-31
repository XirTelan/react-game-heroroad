import React from 'react';

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="mb-4 w-full rounded bg-white bg-opacity-20 py-1 text-center text-xl font-bold text-slate-200">
      {title}
    </div>
  );
};

type HeaderProps = {
  title: string;
};
