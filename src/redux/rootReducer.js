// REDUX
import { combineReducers } from 'redux';
import userReducer from './usersSlice';
import postsReducer from './postsSlice';
import gamesReducer from './gamesSlice';
import chatsReducer from './chatsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  games: gamesReducer,
  chats: chatsReducer
});

export default rootReducer;
