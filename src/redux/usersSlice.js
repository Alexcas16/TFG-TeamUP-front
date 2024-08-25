// REDUX
import { createSlice } from '@reduxjs/toolkit';

//////////////////
//  FIN IMPORTS //
//////////////////

const initialState = {
  currentUser: null,
  users: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, img, juegos, chats} = action.payload;
      state.currentUser = id;
      state.users[id] = { name, img, juegos: juegos, chats: chats };
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    addChat: (state, action) => {
      const { userId, chat } = action.payload;
      state.users[userId].chats.push(chat);
    },
    addGame: (state, action) => {
      const { userId, game } = action.payload;
      state.users[userId].juegos.push(game);
      state.users[userId].juegos.sort((a, b) => a.id - b.id);
    },
    removeChat: (state, action) => {
      const { userId, chatId } = action.payload;
      state.users[userId].chats = state.users[userId].chats.filter(chat => chat.id !== chatId);
    },
    removeGame: (state, action) => {
      const { userId, gameId } = action.payload;
      state.users[userId].juegos = state.users[userId].juegos.filter(game => game.id !== gameId);
    },
  }
});

export const { setUser, clearUser, addChat, addGame, removeChat, removeGame } = userSlice.actions;
export default userSlice.reducer;
