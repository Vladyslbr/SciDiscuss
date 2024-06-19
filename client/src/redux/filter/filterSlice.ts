import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceTypes, UrlParamsType } from "../../types";
import { RootState } from "../store";

const initialState: FilterSliceTypes = {
    urlParams: {},
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setUrlParams(state, action: PayloadAction<UrlParamsType>) {
            state.urlParams = action.payload;
        },
    }
});

export const selectFilter = (state: RootState) => state.filter;

export const { setUrlParams } = filterSlice.actions;

export default filterSlice.reducer;