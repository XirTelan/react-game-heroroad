import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { levelData } from '../../data/level'
import { getScrollPos, isInViewRange } from '../../utils'
import Cell from '../Cell'

export default function Field(props: fieldProps) {
  const { gameMode, setGameMode } = props
  const [fogOfWar, setFogOfWar] = useState<boolean[][]>(
    Array(levelData.length).fill(Array(levelData[0].length).fill(false))
  )

  const [heroPos, setHeroPos] = useState<positionCoord>({ x: 1, y: 1 })
  const fieldWindow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFogOfWar((field) => updateFogOfWar(field, heroPos))
    getScrollPos(heroPos.x, heroPos.y, fieldWindow)
  }, [heroPos])

  function updateFogOfWar(field: boolean[][], heroPos: positionCoord) {
    const newField = field.map((row, i) =>
      row.map((cell, j) => {
        if (cell) return true
        if (isInViewRange(i, j, heroPos.x, heroPos.y)) {
          return true
        }
        return false
      })
    )
    return newField
  }

  function handleMoveClick(i: number, j: number, cellType: number) {
    switch (cellType) {
      case 1:
        if (isInViewRange(i, j, heroPos.x, heroPos.y) && levelData[i][j] !== 0)
          moveToPos(i, j)
        break
      case 2:
        setGameMode('battle')
        break
    }
  }
  function moveToPos(i: number, j: number) {
    setHeroPos({ x: i, y: j })
  }
  return (
    <div
      ref={fieldWindow}
      className="flex max-w-[800px] max-h-[800px] border overflow-hidden "
    >
      <div className="relative  flex flex-col ">
        {levelData.map((row, i) => (
          <div key={i} className="row flex">
            {row.map((cell, j) => (
              <>
                <Cell
                  key={j}
                  i={i}
                  j={j}
                  cellType={cell}
                  heroPos={heroPos}
                  isVisible={fogOfWar[i][j]}
                  handleMoveClick={handleMoveClick}
                />
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

type fieldProps = {
  gameMode: string
  setGameMode: React.Dispatch<SetStateAction<any>>
}
