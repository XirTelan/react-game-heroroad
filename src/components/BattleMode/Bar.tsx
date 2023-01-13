import React from 'react'

export default function Bar(props: barProps) {
  const { title, maxValue, currentValue } = props

  return (
    <div className="flex items-center">
      <div>{title}</div>
      <div className="w-40 relative h-5 ">
        <div className=" bg-slate-800 w-full h-5"></div>
        <div
          className={`absolute top-0 left-0 bg-slate-100 h-5 max-w-full`}
          style={{
            width: `${(currentValue / maxValue) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  )
}

type barProps = {
  title: string
  maxValue: number
  currentValue: number
}
