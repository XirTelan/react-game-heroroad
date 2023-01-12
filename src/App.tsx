import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [heroPos, setHeroPos] = useState({ x: 0, y: 0 })
  const [fogOfWar, setFogOfWar] = useState<boolean[][]>(
    Array(10).fill(Array(10).fill(false))
  )
  const [field, setField] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  )

  useEffect(() => {
    setFogOfWar((field) => updateFogOfWar(field))
  }, [heroPos])

  function updateFogOfWar(field: boolean[][]) {
    const newField = field.map((row, i) =>
      row.map((cell, j) => {
        if (cell) return true
        if (Math.abs(i - heroPos.x) <= 1 && Math.abs(j - heroPos.y) <= 1) {
          return true
        }
        return false
      })
    )
    return newField
  }
  return (
    <div className="App flex w-screen h-screen justify-center items-center">
      <div className="flex max-w-[850px] justify-center items-center gap-1 w-full flex-wrap bg-black">
        {field.map((row, i) => (
          <>
            {row.map((cell, j) => (
              <>
                <div
                  key={j}
                  className="flex bg-red-900 w-20 h-20 cursor-pointer"
                  onClick={() => setHeroPos({ x: i, y: j })}
                >
                  {!fogOfWar[i][j] ? (
                    <div>Hide</div>
                  ) : heroPos.x == i && heroPos.y == j ? (
                    <span>Hero</span>
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

export default App
