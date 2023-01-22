import { configureStore } from '@reduxjs/toolkit';
import fieldSlice from './reducers/fieldSlice';
import gameSlice from './reducers/gameSlice';
import heroSlice from './reducers/heroSlice';

const store = configureStore({
  reducer: {
    hero: heroSlice,
    field: fieldSlice,
    game: gameSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
