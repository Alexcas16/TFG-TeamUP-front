// REDUX
import { createSlice } from '@reduxjs/toolkit';

//////////////////
//  FIN IMPORTS //
//////////////////

const initialState = {
  selectedGame: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    selectGame: (state, action) => {
      state.selectedGame = action.payload;
    }
  },
});

export const { selectGame } = gamesSlice.actions;
export default gamesSlice.reducer;
