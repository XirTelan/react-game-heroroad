import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { levelData } from '../../data/level';

const initialState: InitialState = {
  field: levelData,
  fogOfWar: new Array(levelData.length).fill(
    Array(levelData[0].length).fill(false)
  ),
};

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    clearFieldCell: (state, action: PayloadAction<PositionCoord>) => {
      state.field[action.payload.x][action.payload.y] = 1;
    },
    updateFogField: (state, action: PayloadAction<boolean[][]>) => {
      state.fogOfWar = action.payload;
    },
    startNewGame: (state) => {
      state.field = initialState.field;
      state.fogOfWar = initialState.fogOfWar;
    },
  },
});

export default fieldSlice.reducer;

type InitialState = {
  field: number[][];
  fogOfWar: boolean[][];
};
