import React from 'react'
import { IconContext } from 'react-icons'
import { GiBrickWall } from 'react-icons/gi'
import { BsQuestionSquareFill } from 'react-icons/bs'
import { TbSwords } from 'react-icons/tb'

import { isInViewRange } from '../utils'

export default function Cell(props: cellProps) {
  const { i, j, cellType, isVisible, heroPos, handleMoveClick } = props

  function getCell(cell: number) {
    switch (cell) {
      case 0:
        return <GiBrickWall />
      case 2:
        return <TbSwords />
      default:
        return <div></div>
    }
  }

  const isReacheable = () => {
    return (
      isInViewRange(i, j, heroPos.x, heroPos.y) &&
      (i === heroPos.x || j == heroPos.y)
    )
  }

  return (
    <div
      key={j}
      className={` relative flex w-20 h-20  ${
        cellType === 0
          ? ''
          : isReacheable()
          ? 'cursor-pointer bg-slate-700'
          : ''
      }`}
      onClick={() => {
        if (isReacheable()) handleMoveClick(i, j, cellType)
      }}
    >
      {isVisible ? (
        heroPos.x == i && heroPos.y == j ? (
          <span className="text-white">Hero</span>
        ) : (
          <div className="absolute inset-0 ">
            <IconContext.Provider value={{ color: 'blue', size: '80' }}>
              <div>{getCell(cellType)}</div>
            </IconContext.Provider>
          </div>
        )
      ) : (
        <IconContext.Provider value={{ color: 'blue', size: '70' }}>
          <div className="p-1">
            <BsQuestionSquareFill />
          </div>
        </IconContext.Provider>
      )}
    </div>
  )
}

type cellProps = {
  i: number
  j: number
  cellType: number
  heroPos: positionCoord
  isVisible: boolean
  handleMoveClick: (i: number, j: number, cellType: number) => void
}
