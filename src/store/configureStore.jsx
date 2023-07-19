import { configureStore, combineReducers } from '@reduxjs/toolkit';
import localStorage from './middleware/localStorage';
import login from './login';
import photos from './photos';

const reducer = combineReducers({ login, photos });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorage),
});

export default store;
