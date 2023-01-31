import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Hero = {
  level: 1,
  expCurrent: 0,
  expReq: 50,
  name: 'Hero',
  baseDmg: 10,
  hpMax: 100,
  hpCurrent: 100,
  gold: 0,
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
        state.expCurrent = state.expCurrent - state.expReq;
        state.expReq = state.level * 50;
      }
    },
    gainGold: (state, action: PayloadAction<number>) => {
      state.gold += action.payload;
    },
    spentGold: (state, action: PayloadAction<number>) => {
      state.gold -= action.payload;
    },
    getDamage: (state, action: PayloadAction<number>) => {
      state.hpCurrent -= action.payload;
    },
    restoreHp: (state, action: PayloadAction<number>) => {
      state.hpCurrent += action.payload;
      if (state.hpCurrent > state.hpMax) state.hpCurrent = state.hpMax;
    },
    startNewGame: () => {
      return initialState;
    },
  },
});

export default heroSlice.reducer;
