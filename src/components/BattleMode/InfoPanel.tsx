import React from "react";
import Bar from "./Bar";

export default function InfoPanel(data: character) {
  return (
    <div className="ml-2 mt-2 rounded bg-slate-200 p-4">
      <div className="flex justify-between">
        <div className="">{data.name}</div>
        <div className="">{data.level}</div>
      </div>
      <Bar title={"HP"} maxValue={data.hpMax} currentValue={data.hpCurrent} />
      <Bar title={"MP"} maxValue={635} currentValue={615} />
    </div>
  );
}
