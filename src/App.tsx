import React, { useState } from 'react'

import './App.css'
import Battle from './components/BattleMode/Battle'
import Field from './components/ExploreMode/Field'

function App() {
  const [gameMode, setGameMode] = useState('explore')
  const [characterStats, setCharacterStats] = useState({
    hpMax: 1000,
    hpCurrent: 100,
  })
  return (
    <>
      <div className="App  ">
        <div className="flex justify-center h-screen  items-center ">
          {gameMode === 'explore' && (
            <Field gameMode={gameMode} setGameMode={setGameMode} />
          )}
          {gameMode === 'battle' && <Battle />}
        </div>
      </div>
    </>
  )
}

export default App
