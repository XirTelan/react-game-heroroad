import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Hero = {
  level: 1,
  avalablePoints: 1,
  expCurrent: 0,
  expReq: 75,
  name: 'Hero',
  baseDmg: 10,
  defense: 20,
  hpMax: 100,
  hpCurrent: 100,
  heroPos: { x: 1, y: 0 },
};

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    changePosition: (state, action: PayloadAction<PositionCoord>) => {
      state.heroPos = action.payload;
    },
    gainExp: (state, action: PayloadAction<number>) => {
      state.expCurrent += action.payload;
      if (state.expCurrent > state.expReq) {
        state.level++;
        state.avalablePoints++;
        state.expCurrent = state.expCurrent - state.expReq;
        state.expReq = state.level * 50;
      }
    },
    getDamage: (state, action: PayloadAction<number>) => {
      state.hpCurrent -= action.payload;
    },
    restoreHp: (state, action: PayloadAction<number>) => {
      state.hpCurrent += action.payload;
      if (state.hpCurrent > state.hpMax) state.hpCurrent = state.hpMax;
    },
    upgradeStats: (state, action: PayloadAction<StatsType>) => {
      if (state.avalablePoints === 0) return;
      state.avalablePoints--;
      switch (action.payload) {
        case StatsType.Attack:
          state.baseDmg += 5;
          break;
        case StatsType.Defense:
          state.defense += 5;
          break;
        case StatsType.Hp:
          state.hpMax += 10;
          break;
      }
    },
    startNewGame: () => {
      return initialState;
    },
  },
});

export enum StatsType {
  Attack = 'attack',
  Defense = 'defense',
  Hp = 'hp',
}

export default heroSlice.reducer;
