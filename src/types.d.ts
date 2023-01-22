type PositionCoord = {
  x: number;
  y: number;
};

type Character = {
  name: string;
  level: number;
  hpMax: number;
  hpCurrent: number;
  baseDmg: number;
};

type Hero = {
  level: number;
  expCurrent: number;
  expReq: number;
  name: string;
  baseDmg: number;
  hpMax: number;
  hpCurrent: number;
  gold: number;
  heroPos: PositionCoord;
};
