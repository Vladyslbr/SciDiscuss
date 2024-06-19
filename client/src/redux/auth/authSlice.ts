import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthSliceData, Status } from "../../types";
import { RootState } from "../store";

export const initialState: AuthSliceData = {
    profile: window.localStorage.getItem("profile") || null,
    status: Status.IDLE,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const aoi = action.payload;
            window.localStorage.setItem("profile", aoi);
            state.status = Status.SUCCESS;
            state.profile = aoi;
        },
        logout: (state) => {
            window.localStorage.removeItem("profile");
            state.profile = null;
            state.status = Status.ERROR;
        },
    }
});

export const selectAuthData = (state: RootState) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;