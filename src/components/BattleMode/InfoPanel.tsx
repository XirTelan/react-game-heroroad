import React from 'react'
import Bar from './Bar'

export default function InfoPanel() {
  return (
    <div className="bg-slate-200 p-4 rounded ml-2 mt-2">
      <div className="flex justify-between">
        <div className="">Hero</div>
        <div className="">Lvl 31</div>
      </div>
      <Bar title={'HP'} maxValue={1235} currentValue={615} />
      <Bar title={'MP'} maxValue={635} currentValue={615} />
    </div>
  )
}
