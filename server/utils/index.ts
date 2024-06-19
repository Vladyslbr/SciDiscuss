import POB from "../models/pob.model.ts";
import Author from "../models/author.model.ts";
import VOB from "../models/vob.model.ts";
import { viewContent, viewContentObjs } from "../db/content.db.ts";
import { AuthorType, POBType, VOBType } from "../types/index.ts";
import { viewAuthor, viewAuthors } from "../db/author.db.ts";

export const checkConsistency = (obj: Record<string, any>): boolean => {
    return Object.values(obj).some(value => value === undefined);
};

export const checkByIdUtil = async (id: string | string[], model: "author" | "pob" | "vob", logParam: string) => {
    let check;
    switch (model) {
        case "author":
            check = await Author.findById(id);
            break;
        case "pob":
            check = await POB.findById(id);
            break;
        case "vob":
            check = await VOB.findById(id);
            break;
    };
    if (!check) {
        throw new Error(`Not found <${logParam}> param: ${id}`);
    }
};

export const getContentObjsUtil = async (limit: number, vobIds: string[], owners: string[], searchValue: string) => {
    const pobsObjs = await viewContentObjs(limit, vobIds, owners, searchValue);

    const comObjPromises = pobsObjs.map(async item => {
        const comObj = await getContentObjUtil({ pob: item, vobs: item.vobs });
        return comObj;
    });

    return await Promise.all(comObjPromises);;
};

type _getContentObjType = {
    pob: POBType;
    vobs: VOBType[];
};

export const getContentObjUtil = async ({ pob, vobs }: _getContentObjType) => {

    const vobsIds = vobs.map(item => item._id);
    const latestVob = vobs[0];
    
    const allLastVobs = await _getLastVobs("content");

    const authors = await getAuthorsUtil(latestVob.owners.length, latestVob.owners);
    const connectionsToVobs = allLastVobs.filter(vob => vob.connections.some(connections => vobsIds.includes(connections)));

    const connectionsTo = connectionsToVobs.map(item => item._id);
    const connectionsFrom = latestVob.connections;
    
    const comObj = { ...pob, latestVob: vobs[0], vobs, authors, connectionsTo, connectionsFrom };

    return comObj;
};

type _getAuthorUtil = {
    authorObj: AuthorType;
    vob: VOBType;
};

export const getAuthorUtil = async ({ authorObj, vob }: _getAuthorUtil) => {

    const latestVob = vob;
    
    const allLastVobs = await _getLastVobs("author");

    const connectionsTo = allLastVobs.filter(vob => vob.connections.includes(authorObj._id));
    const connectionsFrom = latestVob.connections;
    
    const comObj = { ...authorObj, latestVob: vob, connectionsTo, connectionsFrom };

    return comObj;
};

export const getAuthorsUtil = async (limit: number, ids: string[]) => {
    
    const authors = await viewAuthors(limit, ids);

    const comObjPromises = authors.map(async item => {
        const comObj = await getAuthorUtil({ authorObj: item, vob: item.latestVob });
        return comObj;
    });


    return await Promise.all(comObjPromises);;
};

export const getRootUtil = async (voi: string) => {
    const data = await viewContent(undefined, voi);
    const poi = data.pobObj._id;
    return poi;
};

export const getPrevVoiUtil = async (voi: string) => {
    const data = await viewAuthor(voi);
    const prev_voi = data.vobObj._id
    return prev_voi;
};


const _getLastVobs = async (type: "content" | "author"): Promise<VOBType[]> => {

    //rewrite for mutableState

    if (type === "content") {
        const objs = await viewContentObjs();
        const latestVob = objs.map(item => item.vobs[0]);
        return latestVob;
    } else {
        const objs = await viewAuthors();
        const latestVob = objs.map(item => item.latestVob)
        return latestVob;
    };
};