import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthorObjType, AuthorReqObjType, AuthorType, CONNECTIONS_TYPE, ContentObjType, ContentReqObjType, ContentType, ContentTypesEnum, PREV_VOI_TYPE, ROOT_TYPE, SignAppendAuthorObjType, SignAppendContentObjType, SignCreateAuthorObjType, SignCreateContentObjType, SignTypesEnum, UrlParamsType } from "../../types";
import { RootState } from "../store";
import api from "../../api";
import { signMsg } from "../../utils/crypto";

type _getDataType = {
    aoi?: string;
    contentParams?: {
        owners: string[]
    };
};

export const getData = createAsyncThunk<[AuthorType, ContentType[]], _getDataType, { state: RootState }>(
    "data/getData",
    async ({ aoi, contentParams }, { getState, rejectWithValue }) => {
        let author, content, authorId: string;

        const { profile } = getState().auth;

        if (aoi) {
            authorId = aoi;
        } else if (profile) {
            authorId = profile;
        } else {
            return rejectWithValue("no profile");
        };

        try {
            [ author, content ] = await Promise.all([
                api.get<AuthorType>(`/author/${authorId}`),
                api.get<ContentType[]>(`/content/`, { params: contentParams })
            ]);
        } catch (error: any) {
            return rejectWithValue("no profile");
        };
        return [author.data, content.data];
    },
);

// Content

export const getContent = createAsyncThunk<ContentType[], void, { state: RootState }>(
    "data/getContent",
    async (_, { getState, rejectWithValue }) => {
        let content;

        const params = getState().filter.urlParams;
        
        try {
            if (params?.vobIds?.length === 0) {
                content = [] as ContentType[];
                return content;
            } else {
                content = await api.get<ContentType[]>(`/content/`, { params });
                return content.data;
            };
        } catch (error: any) {
            return rejectWithValue("no profile");
        };
    },
);

type _getContentObjType = {
    poi: string;
};

export const getContentObj = createAsyncThunk<ContentType, _getContentObjType, { state: RootState }>(
    "data/getContentObject",
    async ({ poi }, { rejectWithValue }) => {
        let content;

        try {
            content = await api.get<ContentType>(`/content/${poi}`, { })
        } catch (error: any) {
            //return handleErrors(error, rejectWithValue, "Error while getting data");
            return rejectWithValue("no profile");
        };
        return content.data;
    },
);

type _postContent = {
    privateKey: string;
    patchParams?: {
        id: string;
        msg: {
            root: ROOT_TYPE;
            connections: CONNECTIONS_TYPE;
            prev_voi: PREV_VOI_TYPE;
            content: ContentObjType;
        };
    },
    postParams?: {
        msg: {
            connections: CONNECTIONS_TYPE;
            content: ContentObjType;
        };
    },
    type: ContentTypesEnum;
};

export const postContent = createAsyncThunk<void, _postContent, { state: RootState }>(
    "data/postContent",
    async ({ privateKey, patchParams, postParams, type }, { rejectWithValue }) => {
        try {
            if (patchParams) {
                const { id, msg } = patchParams;

                const modMsg: SignAppendContentObjType = {
                    ...msg,
                    type: SignTypesEnum.APPEND_CONTENT,
                };

                const { encodedSign, pub_key } = signMsg(privateKey, modMsg);
    
                const owner = `AOI::${pub_key}`;
    
                const reqObj: ContentReqObjType = {
                    sig: encodedSign,
                    owner,
                    connections: msg.connections,
                    content: {
                       body: msg.content.body,
                    },
                    type,
                };

                await api.patch(`/content/${id}`, reqObj);
            } else if (postParams) {
                const { msg } = postParams;

                const modMsg: SignCreateContentObjType = {
                    ...msg,
                    type: SignTypesEnum.CREATE_CONTENT,
                };
    
                const { encodedSign, pub_key } = signMsg(privateKey, modMsg);
    
                const owner = `AOI::${pub_key}`;
    
                const reqObj: ContentReqObjType = {
                    sig: encodedSign,
                    owner,
                    connections: msg.connections,
                    content: {
                       body: msg.content.body,
                    },
                    type,
                };

                await api.post(`/content/`, reqObj);
            } else {
                return rejectWithValue("enter msg object type");
            };

        } catch (error: any) {
            //return handleErrors(error, rejectWithValue, "Error while getting data");
            return rejectWithValue("no profile");
        };
    },
);

// Author

type _getAuthorType = {
    aoi: string;
};

export const getAuthor = createAsyncThunk<AuthorType, _getAuthorType, { state: RootState }>(
    "data/getAuthor",
    async ({ aoi }, { rejectWithValue }) => {
        let author;
        try {
            author = await api.get<AuthorType>(`/content/${aoi}`);
        } catch (error: any) {
            //return handleErrors(error, rejectWithValue, "Error while getting data");
            return rejectWithValue("no profile");
        };
        return author.data;
    },
);

type _postAuthor = {
    privateKey: string;
    patchParams?: {
        id: string;
        msg: {
            root: ROOT_TYPE;
            connections: CONNECTIONS_TYPE;
            prev_voi: PREV_VOI_TYPE;
            content: AuthorObjType;
        };
    },
    postParams?: {
        msg: {
            connections: CONNECTIONS_TYPE;
            content: AuthorObjType;
        };
    },
};

export const postAuthor = createAsyncThunk<void, _postAuthor, { state: RootState }>(
    "data/postAuthor",
    async ({ privateKey, patchParams, postParams }, { rejectWithValue }) => {
        try {
            if (patchParams) {
                const { id, msg } = patchParams;

                const modMsg: SignAppendAuthorObjType = {
                    ...msg,
                    type: SignTypesEnum.APPEND_AUTHOR,
                };

                const { encodedSign, pub_key } = signMsg(privateKey, modMsg);
    
                const owner = `AOI::${pub_key}`;
    
                const reqObj: AuthorReqObjType = {
                    sig: encodedSign,
                    owner,
                    connections: msg.connections,
                    content: msg.content,
                };

                await api.patch(`/author/${id}`, reqObj);
            } else if (postParams) {
                const { msg } = postParams;

                const modMsg: SignCreateAuthorObjType = {
                    ...msg,
                    type: SignTypesEnum.CREATE_AUTHOR,
                };
    
                const { encodedSign, pub_key } = signMsg(privateKey, modMsg);
    
                const owner = `AOI::${pub_key}`;
    
                const reqObj: AuthorReqObjType = {
                    sig: encodedSign,
                    owner,
                    connections: msg.connections,
                    content: msg.content,
                };

                await api.post(`/author/`, reqObj);
            } else {
                return rejectWithValue("enter msg object type");
            };

        } catch (error: any) {
            //return handleErrors(error, rejectWithValue, "Error while getting data");
            return rejectWithValue("no profile");
        };
    },
);