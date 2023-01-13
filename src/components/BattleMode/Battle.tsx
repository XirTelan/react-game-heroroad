import React from 'react'
import Bar from './Bar'
import InfoPanel from './InfoPanel'

export default function Battle() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center m-auto   max-w-[800px] max-h-[800px]  overflow-hidden ">
        <div
          className="w-full h-80"
          style={{
            backgroundImage: '',
            background: 'url("https://via.placeholder.com/900x300")',
          }}
        >
          <div className="flex top-0 w-full justify-between ">
            <InfoPanel />
            <div>Player Turn</div>
            <InfoPanel />
          </div>
        </div>
        <div>Battle</div>
      </div>
    </>
  )
}
