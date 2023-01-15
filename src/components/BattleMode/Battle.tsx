import React, { SetStateAction, useEffect, useState } from "react";
import Bar from "./Bar";
import InfoPanel from "./InfoPanel";
import data from "../../data/database.json";

export default function Battle(props: battleProps) {
  const { playerStats, setGameMode } = props;
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [enemy, setEnemy] = useState(() => createEnemy(data.enemies[0]));

  useEffect(() => {
    if (enemy.hpCurrent <= 0) setGameMode("explore");
  }, [enemy, playerStats]);

  function createEnemy(data: any) {
    return {
      id: data.id,
      name: data.name,
      baseDmg: data.baseDmg,
      hpCurrent: data.hpMax,
      hpMax: data.hpMax,
      level: data.level,
    } as character;
  }

  function makeAction(action: string) {
    if (!isPlayerTurn) return;
    switch (action) {
      case "attack":
        attack(playerStats, enemy);
        setIsPlayerTurn(false);
        break;
    }
  }

  function attack(src: character, dst: character) {
    const newHp = (dst.hpCurrent -= src.baseDmg);
    console.log(dst);
    setEnemy({ ...dst, hpCurrent: newHp });
  }

  console.log(enemy);
  return (
    <>
      <div className="container m-auto flex max-h-[800px] max-w-[800px] flex-col   items-center justify-center  overflow-hidden ">
        <div
          className="h-80 w-full"
          style={{
            backgroundImage: "",
            background: 'url("https://via.placeholder.com/900x300")',
          }}
        >
          <div className="flex h-full flex-col justify-between ">
            <div className="top-0 flex w-full justify-between ">
              <InfoPanel {...playerStats} />
              <div>{isPlayerTurn ? "Player Turn" : "Enemy turn"}</div>
              <InfoPanel {...enemy} />
            </div>
            <div className="mx-3  mb-3 flex flex-col  rounded bg-black bg-opacity-90">
              <div className="flex bg-white bg-opacity-5">
                <div className="p-3 text-white">
                  <button onClick={() => attack(playerStats, enemy)}>
                    Attack
                  </button>
                  <div>Skill</div>
                  <div>Items</div>
                  <div>Defend</div>
                </div>
                <div className="m-3 flex grow rounded bg-white bg-opacity-10">
                  <div className="p-1">
                    <div>Fire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>Battle</div>
      </div>
    </>
  );
}

type battleProps = {
  setGameMode: React.Dispatch<SetStateAction<string>>;
  playerStats: character;
};
