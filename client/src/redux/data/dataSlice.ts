import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ContentType, DataSliceData, Status } from "../../types";
import { getAuthor, getContent, getContentObj, getData, postAuthor, postContent } from "./dataThunk";

export const initialState: DataSliceData = {
    author: null,
    content: [],
    authorObj: null,
    contentObj: null,
    status: Status.IDLE,
    error: "",
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setContentObj: (state, action: PayloadAction<ContentType>) => {
            state.contentObj = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getData.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getData.fulfilled, (state, action) => {
            const [author, content] = action.payload;
            state.author = author;
            state.content = content;
            state.status = Status.SUCCESS;
        })
        .addCase(getData.rejected, (state, action) => {
            state.author = null;
            state.content = [];
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });

        builder
        .addCase(getContent.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getContent.fulfilled, (state, action) => {
            state.content = action.payload;
            state.status = Status.SUCCESS;
        })
        .addCase(getContent.rejected, (state, action) => {
            state.content = [];
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });

        builder
        .addCase(getContentObj.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getContentObj.fulfilled, (state, action) => {
            state.contentObj = action.payload;
            state.status = Status.SUCCESS;
        })
        .addCase(getContentObj.rejected, (state, action) => {
            state.contentObj = null;
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });

        builder
        .addCase(postContent.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(postContent.fulfilled, (state) => {
            state.status = Status.SUCCESS;
        })
        .addCase(postContent.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });

        builder
        .addCase(getAuthor.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getAuthor.fulfilled, (state, action) => {
            state.authorObj = action.payload;
            state.status = Status.SUCCESS;
        })
        .addCase(getAuthor.rejected, (state, action) => {
            state.authorObj = null;
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });

        builder
        .addCase(postAuthor.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(postAuthor.fulfilled, (state) => {
            state.status = Status.SUCCESS;
        })
        .addCase(postAuthor.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
        });
    }
});

export const selectData = (state: RootState) => state.data;

export const { setContentObj } = dataSlice.actions;

export default dataSlice.reducer;