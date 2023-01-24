import React from 'react';
import Bar from './Bar';

export default function InfoPanel(data: Character) {
  return (
    <div className="m-2 rounded bg-slate-200 p-4">
      <div className="flex justify-between">
        <div className="">{data.name}</div>
        <div className="">{data.level}</div>
      </div>
      <Bar maxValue={data.hpMax} currentValue={data.hpCurrent} />
    </div>
  );
}
