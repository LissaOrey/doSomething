import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from './Slices/usersSlice';
import profileSlice from './Slices/profileSlice';
import authSlice from './Slices/authSlice';
import { homeReducer } from "./HomeReducer";

const rootReducer = combineReducers({
    users: usersSlice,
    profile: profileSlice,
    auth: authSlice,
    home: homeReducer,
})

export const store = configureStore({
    reducer: rootReducer
})