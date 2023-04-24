import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from './features/todoSlice';

const rootReducer = combineReducers({
    todo: todoReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;