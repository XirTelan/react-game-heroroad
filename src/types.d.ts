type PositionCoord = {
  x: number;
  y: number;
};

interface Character {
  name: string;
  level: number;
  hpMax: number;
  hpCurrent: number;
  baseDmg: number;
  defense: number;
}

interface Hero extends Character {
  avalablePoints: number;
  expCurrent: number;
  expReq: number;
  heroPos: PositionCoord;
}
