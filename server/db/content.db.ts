import POB from "../models/pob.model.ts";
import VOB from "../models/vob.model.ts";
import {
    CONNECTIONS_TYPE,
    ContentObjType,
    ContentStrictObjType,
    ContentTypesEnum,
    OWNERS_TYPE,
    POBType,
    PREV_VOI_TYPE,
    ROOT_TYPE,
    TRANSACTION_TYPE,
    VOBType,
} from "../types/index.ts";
import { checkByIdUtil } from "../utils/index.ts";

type _createContentType = {
    _id: string;
    type: ContentTypesEnum;
};

type _createVOBType = {
    _id: string;
    root: ROOT_TYPE;
    owners: OWNERS_TYPE;
    connections?: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content: ContentStrictObjType;
    transaction: TRANSACTION_TYPE;
};

export const createContent = async (pob: _createContentType, vob: _createVOBType) => {
    try {
        await checkByIdUtil(vob.owners, "author", "owners");

        const pobObj = new POB(pob);
        await pobObj.save();

        const vobObj = new VOB(vob);
        await vobObj.save();

        return {
            pobObj,
            vobObj,
        };
    } catch (error) {
        throw new Error(`Error while creating content: ${error}`);
    }
};

type _appendVOBType = {
    _id: string;
    root: ROOT_TYPE;
    owners: OWNERS_TYPE;
    connections?: CONNECTIONS_TYPE;
    prev_voi: PREV_VOI_TYPE;
    content?: ContentObjType;
    transaction: TRANSACTION_TYPE;
};

export const appendContent = async (vob: _appendVOBType) => {
    try {
        await checkByIdUtil(vob.owners, "author", "owners");
        await checkByIdUtil(vob.prev_voi, "vob", "prev_voi");
        await checkByIdUtil(vob.root, "pob", "root");

        const vobObj = new VOB(vob);
        await vobObj.save();

        return {
            vobObj,
        };
    } catch (error) {
        throw new Error(`Error while creating content: ${error}`);
    }
};

export const viewContent = async (poi?: string, voi?: string): Promise<{ pobObj: POBType; vobObjs: VOBType[] }> => {
    try {        
        if (poi) {
            const pobObj = await POB.findById(poi).lean();
            if (!pobObj) {
                throw new Error(`Not found POB object by id: ${poi}`);
            }

            const vobObjs = await VOB.find({ root: poi }).sort({ createdAt: -1 }).lean();

            if (!vobObjs) {
                throw new Error();
            }

            return {
                pobObj,
                vobObjs
            };

        } else if (voi) {
            const vobObj = await VOB.findById(voi).lean();

            if (!vobObj) {
                throw new Error(`Not found VOB object by id: ${voi}`);
            }

            const pobObj = await POB.findById(vobObj.root).lean();
            if (!pobObj) {
                throw new Error(`Not found POB object`);
            }

            const vobObjs = await VOB.find({ root: pobObj._id }).sort({ createdAt: -1 }).lean();

            if (!vobObjs) {
                throw new Error();
            }

            return {
                pobObj,
                vobObjs
            };

        } else {
            throw new Error(`AOI or VOI should be provided`)
        };

    } catch (error) {
        throw new Error(`Error while getting Author or VOB: ${error}`);
    };
};

export const viewContentObjs = async (limit?: number, vobIds?: string[], owners?: string[], searchValue?: string) => {
    try {
        const standardLimit = 1000;

        if (limit && limit <= 0) {
            throw new Error(`Limit should be a positive number`);
        };

        let query: any = {};
        if (owners && owners.length > 0) {
            query.owners = { $in: owners };
        };
        if (vobIds && vobIds.length > 0) {
            query._id = { $in: vobIds };
        };
        if (searchValue) {
            query.$or = [
                { 'content.bio': { $regex: searchValue, $options: 'i' } },
                { 'content.body': { $regex: searchValue, $options: 'i' } }
            ];
        };
        
        let vobs, pobs;
        if (owners || vobIds || searchValue) {
            vobs = await VOB.find(query).lean();
            const pobIds = vobs.map(item => item.root);
            pobs = await POB.find({ _id: pobIds }).limit(limit || standardLimit).lean();
        } else {
            pobs = await POB.find().limit(limit || standardLimit).lean();
        };

        const pobObjs = await Promise.all(pobs.map(async (pob) => {
            const pobObj = {
                ...pob,
                vobs: [] as VOBType[],
            };

            const vobs = await VOB.find({ root: pob._id }).sort({ createdAt: -1 }).lean();

            if (vobs && vobs.length > 0) {
                pobObj.vobs.push(...vobs);
            }

            return pobObj;
        }));

        return pobObjs;

    } catch (error) {
        throw new Error(`Error while getting POBs: ${error}`);
    };
};
