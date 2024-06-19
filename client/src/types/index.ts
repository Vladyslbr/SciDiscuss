
// Models types

export type ID_TYPE = string;
export type OWNERS_TYPE = string[];
export type OWNER_TYPE = string;
export type ROOT_TYPE = string;
export type CONNECTIONS_TYPE = string[];
export type PREV_VOI_TYPE = string;
export type TRANSACTION_TYPE = string;
export type SIGNATURE_TYPE = string;

// POB types

export type ContentType = {
    _id: ID_TYPE;
    type: ContentTypesEnum;
    vobs: VobContentType[];
    authors: AuthorType[];
    connectionsTo: string[];
    connectionsFrom: string[];
    createdAt: string;
};

export type AuthorType = {
    _id: ID_TYPE;
    nickname: string;
    latestVob: VobAuthorType;
    connectionsTo: VobAuthorType[];
    connectionsFrom: CONNECTIONS_TYPE;
    createdAt: string;
};

// VOB types

export type VobAuthorType = {
    _id: string;
    root: string;
    owners: string[];
    connections: string[];
    prev_voi: string;
    content: VobAuthorContentObjType;
    transaction: string;
    createdAt: string;
};

export type VobContentType = {
    _id: ID_TYPE;
    root: ROOT_TYPE;
    owners: OWNERS_TYPE;
    connections: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: VobContentObjType;
    transaction: TRANSACTION_TYPE;
    createdAt: string;
};

// Types

export enum ContentTypesEnum {
    POST = "post",
    PROBLEM = "problem",
    EXTERNAL = "external",
}

export type ContentObjType = {
    body: string;
};

export type AuthorObjType = {
    bio: string;
    name: string;
    nickname: string;
};

export interface ReqObjBaseType {
    sig: SIGNATURE_TYPE;
    owner: OWNER_TYPE;
    connections: CONNECTIONS_TYPE;
};

export interface AuthorReqObjType extends ReqObjBaseType {
    content: AuthorObjType;
};

export interface ContentReqObjType extends ReqObjBaseType {
    type: ContentTypesEnum;
    content: ContentObjType;
};

// Redux types

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
};

export type DataSliceData = {
    author: AuthorType | null;
    content: ContentType[];
    authorObj: AuthorType | null;
    contentObj: ContentType | null;
    status: Status;
    error: string | null;
};

export type AuthSliceData = {
    profile: string | null;
    status: Status;
    error: string | null;
};

export type SortItemType = {
    name: "created-descending";
    sortProp1: "created";
    sortProp2: "desc";
} | {
    name: "created-ascending";
    sortProp1: "created";
    sortProp2: "asc";
} | {
    name: "modified-ascending";
    sortProp1: "edited";
    sortProp2: "asc";
} | {
    name: "modified-descending";
    sortProp1: "edited";
    sortProp2: "desc";
};

export type FilterSliceTypes = {
    urlParams: UrlParamsType;
};

export type UrlParamsType = {
    owners?: string[];
    vobIds?: string[];
    searchValue?: string;
    sort?: SortItemType;
};


//===

export type VobContentObjType = {
    body: string;
    abstract?: string;
    title?: string;
};

export type VobAuthorContentObjType = {
    bio: string;
    name: string;
    nickname: string;
};



export type NodePostVersionedType = {
    id: string;
    linkedObj: any;
    version: number;
    created: string;
    author: any;
    content: {
       body: string;
    };
};
 
export type NodePostPersistentType = {
    id: string;
    type: string;
    created: string;
    authors: any;
    versions: NodePostVersionedType[];
    latest: NodePostVersionedType;
    fields: any;
    linksTo: any;
    linksFrom: any;
};

// Sign objs types

export enum SignTypesEnum {
    CREATE_CONTENT = "create-content",
    CREATE_AUTHOR = "create-author",
    APPEND_CONTENT = "append-content",
    APPEND_AUTHOR = "append-author",
};

export type SignCreateContentObjType = {
    type: SignTypesEnum.CREATE_CONTENT;
    connections: CONNECTIONS_TYPE;
    content: ContentObjType;
};

export type SignCreateAuthorObjType = {
    type: SignTypesEnum.CREATE_AUTHOR;
    connections: CONNECTIONS_TYPE;
    content: AuthorObjType;
};

export type SignAppendContentObjType = {
    type: SignTypesEnum.APPEND_CONTENT;
    root: ROOT_TYPE;
    connections: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: ContentObjType;
};

export type SignAppendAuthorObjType = {
    type: SignTypesEnum.APPEND_AUTHOR;
    root: ROOT_TYPE;
    connections: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: AuthorObjType;
};
