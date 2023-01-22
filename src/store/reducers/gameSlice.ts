import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameModes } from '../../App';

const initialState: InitialState = {
  gameMode: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameMode: (state, action: PayloadAction<GameModes>) => {
      state.gameMode = action.payload;
    },
    startNewGame: (state) => {
      state.gameMode = 0;
    },
  },
});

export default gameSlice.reducer;

type InitialState = {
  gameMode: GameModes;
};
