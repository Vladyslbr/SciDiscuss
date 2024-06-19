import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'

import filter from "./filter/filterSlice";
import data from "./data/dataSlice";
import auth from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        data,
        filter,
        auth,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;