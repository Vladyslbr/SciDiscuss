// Models types

export type ID_TYPE = string;
export type OWNERS_TYPE = string[];
export type OWNER_TYPE = string;
export type ROOT_TYPE = string;
export type CONNECTIONS_TYPE = string[];
export type PREV_VOI_TYPE = string;
export type TRANSACTION_TYPE = string;
export type SIGNATURE_TYPE = string;

// Comprised types

export type AuthorComprisedType = {
    _id: ID_TYPE;
    nickname: string;
    latestVob: VOBType;
    connectionsTo: VOBType[];
    connectionsFrom: CONNECTIONS_TYPE;
    createdAt?: string;
};

export type POBComprisedType = {
    _id: ID_TYPE;
    type: ContentTypesEnum;
    vobs?: VOBType[];
    latestVob: VOBType;
    authors: AuthorComprisedType[];
    connectionsTo: string[];
    connectionsFrom: CONNECTIONS_TYPE;
    createdAt?: string;
};

// Standart types

export type AuthorType = {
    _id: ID_TYPE;
    nickname: string;
};

export type VOBType = {
    _id: ID_TYPE;
    root: ROOT_TYPE;
    owners: OWNERS_TYPE;
    connections: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: VobContentObjType;
    transaction: TRANSACTION_TYPE;
};

export type VobContentObjType = {
    body?: string;
    abstract?: string;
    title?: string;
    bio?: string;
    name?: string;
    nickname?: string;
};

export type ContentObjType = {
    body?: string;
    abstract?: string;
    title?: string;
};

export type ContentStrictObjType = {
    body: string;
    title?: string;
};

export type AuthorObjType = {
    bio: string;
    name: string;
    nickname: string;
};

export type AuthorStrictObjType = {
    bio: string;
    name: string;
    nickname: string;
};

export enum ContentTypesEnum {
    POST = "post",
    PROBLEM = "problem",
    EXTERNAL = "external",
}

export type POBType = {
    _id: ID_TYPE;
    type: ContentTypesEnum;
};

export enum ActionTypesEnum {
    CREATE = "create",
    APPEND = "append",
    SHADOW = "shadow",
}

export enum TrTypeEnum {
    CONTENT = "content",
    AUTHOR = "author",
}

export type TransactionType = {
    _id: ID_TYPE;
    sign: SIGNATURE_TYPE;
    tr_type: TrTypeEnum;
    action: ActionTypesEnum;
    owner: OWNER_TYPE;
    tr_obj: ContentVobObjType | AuthorVobObjType;
    size: string;
};

export type ContentVobObjType = {
    root: ROOT_TYPE;
    type: ContentTypesEnum;
    connections?: CONNECTIONS_TYPE;
    content?: ContentObjType;
    prev_voi: PREV_VOI_TYPE;
};

export type AuthorVobObjType = {
    root: ROOT_TYPE;
    connections?: CONNECTIONS_TYPE;
    content?: AuthorObjType;
    prev_voi: PREV_VOI_TYPE;
};

// Transaction types

export interface ProcessTransactionBaseType {
    tr_type: TrTypeEnum;
    action: ActionTypesEnum;
    sig: SIGNATURE_TYPE;
    owner: OWNER_TYPE;
    connections: CONNECTIONS_TYPE;
};

export interface CreateAuthorType extends ProcessTransactionBaseType {
    tr_type: TrTypeEnum.AUTHOR;
    action: ActionTypesEnum.CREATE;
    content: AuthorStrictObjType;
};

export interface CreateContentType extends ProcessTransactionBaseType {
    tr_type: TrTypeEnum.CONTENT;
    action: ActionTypesEnum.CREATE;
    type: ContentTypesEnum;
    content: ContentStrictObjType;
};

export interface AppendAuthorType extends ProcessTransactionBaseType {
    tr_type: TrTypeEnum.AUTHOR;
    action: ActionTypesEnum.APPEND | ActionTypesEnum.SHADOW;
    root: ROOT_TYPE,
    prev_voi: PREV_VOI_TYPE,
    content: AuthorStrictObjType;
};

export interface AppendContentType extends ProcessTransactionBaseType {
    tr_type: TrTypeEnum.CONTENT;
    action: ActionTypesEnum.APPEND | ActionTypesEnum.SHADOW;
    root: ROOT_TYPE,
    type?: ContentTypesEnum;
    prev_voi: PREV_VOI_TYPE,
    content: ContentStrictObjType;
};

export type TransactionReqObjectType = CreateAuthorType | CreateContentType | AppendAuthorType | AppendContentType

// Sign objs types

export type SignCreateObjType = {
    connections: CONNECTIONS_TYPE;
    content: ContentStrictObjType | AuthorStrictObjType;
};

export type SignAppendObjType = {
    root: ROOT_TYPE;
    connections: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: ContentStrictObjType | AuthorStrictObjType;
};
