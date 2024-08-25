// REDUX
import { createSlice } from '@reduxjs/toolkit';

//////////////////
//  FIN IMPORTS //
//////////////////

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      if (!state.posts) {
        state.posts = [];
      }
      state.posts.push(action.payload);
    },
    changeForum: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { addPost, changeForum } = postsSlice.actions;
export default postsSlice.reducer;
