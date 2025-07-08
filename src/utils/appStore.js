import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './commentsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, commentsReducer);

export const appStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(appStore);
