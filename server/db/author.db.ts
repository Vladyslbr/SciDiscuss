import Author from "../models/author.model.ts";
import VOB from "../models/vob.model.ts";
import {
    AuthorObjType,
    AuthorStrictObjType,
    AuthorType,
    CONNECTIONS_TYPE,
    OWNERS_TYPE,
    PREV_VOI_TYPE,
    ROOT_TYPE,
    TRANSACTION_TYPE,
    VOBType,
} from "../types/index.ts";
import { checkByIdUtil } from "../utils/index.ts";

type _createAuthorType = {
    _id: string;
    nickname: string;
};

type _createVOBType = {
    _id: string;
    root: ROOT_TYPE;
    owners: OWNERS_TYPE;
    connections?: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: AuthorStrictObjType;
    transaction: TRANSACTION_TYPE;
};

export const createAuthor = async (
    author: _createAuthorType,
    vob: _createVOBType,
) => {
    try {
        const authorObj = new Author(author);
        await authorObj.save();

        const vobObj = new VOB(vob);
        await vobObj.save();

        return {
            authorObj,
            vobObj,
        };
    } catch (error) {
        throw new Error(`Error while creating author: ${error}`);
    }
};

type _appendVOBType = {
    _id: string;
    content?: AuthorObjType;
    connections?: CONNECTIONS_TYPE;
    owners: OWNERS_TYPE;
    transaction: TRANSACTION_TYPE;
    root: ROOT_TYPE;
    prev_voi: PREV_VOI_TYPE;
};

export const appendAuthor = async (vob: _appendVOBType) => {
    try {

        await checkByIdUtil(vob.root, "author", "root");
        await checkByIdUtil(vob.prev_voi, "vob", "prev_voi");

        const vobObj = new VOB(vob);
        await vobObj.save();

        return {
            vobObj,
        };
    } catch (error) {
        throw new Error(`Error while creating vob: ${error}`);
    }
};

export const viewAuthor = async (aoi?: string, voi?: string): Promise<{ authorObj: AuthorType; vobObj: VOBType }> => {
    try {
        if (aoi) {
            const authorObj = await Author.findById(aoi).lean();
            if (!authorObj) {
                throw new Error(`Not found Author object by id: ${aoi}`);
            }

            const latestVob = await VOB.find({ root: aoi }).sort({ createdAt: -1 }).lean();
            const vobObj = latestVob[0];
            
            if (!vobObj) {
                throw new Error()
            };

            return {
                authorObj,
                vobObj
            };

        } else if (voi) {
            const vobObj = await VOB.findById(voi);
            if (!vobObj) {
                throw new Error(`Not found VOB object by id: ${voi}`);
            }

            const authorObj = await Author.findById(vobObj.root);
            if (!authorObj) {
                throw new Error(`Not found Author object by id: ${aoi}`);
            }

            return {
                authorObj,
                vobObj
            };

        } else {
            throw new Error(`AOI or VOI should be provided`)
        };

    } catch (error) {
        throw new Error(`Error while getting Author or VOB: ${error}`);
    };
};

export const viewAuthors = async (limit?: number, ids?: string[]) => {
    try {
        const standartLimit = 1000;

        if (limit && limit <= 0) {
            throw new Error(`Limit should be a positive number`);
        };

        let query = {};
        if (ids && ids.length > 0) {
            query = { _id: { $in: ids } };
        };

        const authors = await Author.find(query).limit(limit || standartLimit).lean();

        const authorsObjs = await Promise.all(authors.map(async (author) => {
            const authorObj = {
                ...author,
                latestVob: {} as VOBType,
            };

            const vobs = await VOB.find({ root: author._id }).sort({ createdAt: -1 }).lean();

            if (vobs) {
                authorObj.latestVob = vobs[0];
            }

            return authorObj;
        }));

        return authorsObjs;

    } catch (error) {
        throw new Error(`Error while getting Authors: ${error}`);
    };
};
