import React, { useState } from "react";

import "./App.css";
import Battle from "./components/BattleMode/Battle";
import Field from "./components/ExploreMode/Field";
import Winner from "./components/Winner";

function App() {
  const [gameMode, setGameMode] = useState("explore");
  const [characterStats, setCharacterStats] = useState({
    level: 1,
    name: "Hero",
    baseDmg: 50,
    hpMax: 1000,
    hpCurrent: 100,
    gold: 150,
  });
  return (
    <>
      <div className="App  ">
        <div className="flex h-screen items-center  justify-center ">
          {gameMode == "win" && <Winner />}
          <div className="text-white ">
            Stats
            <div>
              <span></span>
            </div>
          </div>
          <Field gameMode={gameMode} setGameMode={setGameMode} />
          {gameMode === "battle" && (
            <div className="absolute flex h-full w-full flex-col items-center bg-black bg-opacity-60 ">
              <div className="absolute top-10 text-4xl font-bold text-white ">
                BATTLE
              </div>
              <Battle setGameMode={setGameMode} playerStats={characterStats} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
