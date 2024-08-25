// REDUX
import { createSlice } from '@reduxjs/toolkit';

//////////////////
//  FIN IMPORTS //
//////////////////

const initialState = {
  selectedChat: null,
  chatMessages: [],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    changeChat: (state, action) => {
      const sortedMessages = action.payload.slice().sort((a, b) => new Date(a.time) - new Date(b.time));
      state.chatMessages = sortedMessages;
    },
    cleanChat: (state, action) => {
      state.chatMessages = action.payload;
    },
    addMessage: (state, action) => {
      if (!state.chatMessages) {
        state.chatMessages = [];
      }
      state.chatMessages.push(action.payload);
      state.chatMessages.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
  },
});

export const { selectChat, changeChat, addMessage, cleanChat } = chatsSlice.actions;
export default chatsSlice.reducer;
