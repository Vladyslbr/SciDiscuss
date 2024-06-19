import {
    ActionTypesEnum,
    TrTypeEnum,
    TransactionReqObjectType,
} from "../types";
import { appendAuthor, createAuthor } from "./author.db.ts";
import Transaction from "../models/transaction.model.ts";
import { appendContent, createContent, viewContent } from "./content.db.ts";
import { getHash, signVerify } from "./crypto.ts";

export const processTransaction = async (reqObj: TransactionReqObjectType) => {
    try {

        const hashedObj = getHash(reqObj);
        const { verify, pubKey } = signVerify(reqObj);

        const toi = `TOI::${hashedObj}`;
        const voi = `VOI::${hashedObj}`;
        const aoi = `AOI::${pubKey}`;

        if (!verify) {
            throw new Error(`Signature and Public id do not match`);
        };

        let resObj, vobObj;
        switch (reqObj.action) {
            case ActionTypesEnum.CREATE:
                if (reqObj.tr_type === TrTypeEnum.AUTHOR) {        
                    vobObj = {
                        _id: voi,
                        root: aoi,
                        owners: [aoi],
                        connections: reqObj.connections,
                        prev_voi: voi,
                        content: reqObj.content,
                        transaction: toi,
                    };
        
                    const authorObj = {
                        _id: aoi,
                        nickname: reqObj.content.nickname,
                    };
        
                    resObj = await createAuthor(authorObj, vobObj);
                } else if (reqObj.tr_type === TrTypeEnum.CONTENT) {
                    const poi = `POI::${hashedObj}`;
        
                    vobObj = {
                        _id: voi,
                        root: poi,
                        owners: [reqObj.owner],
                        connections: reqObj.connections,
                        prev_voi: voi,
                        content: reqObj.content,
                        transaction: toi,
                    };
        
                    const pobObj = {
                        _id: poi,
                        type: reqObj.type,
                    };
        
                    resObj = await createContent(pobObj, vobObj);
                } else {
                    throw new Error(`For tr_type param must be provided`);
                };
                break;
            case ActionTypesEnum.APPEND || ActionTypesEnum.SHADOW:
                if (reqObj.tr_type === TrTypeEnum.AUTHOR) {
                    vobObj = {
                        _id: voi,
                        root: aoi,
                        owners: [aoi],
                        connections: reqObj.connections,
                        prev_voi: reqObj.prev_voi,
                        content: reqObj.content,
                        transaction: toi,
                    };
                    resObj = await appendAuthor(vobObj);
                } else if (reqObj.tr_type === TrTypeEnum.CONTENT) {
                    // leak: need additional verifications
                    const pobObj = await viewContent(undefined, reqObj.prev_voi);
                    const latestVob = pobObj.vobObjs[0].owners;

                    if (!latestVob.includes(aoi)) {
                        throw new Error(`Owner and root owners[] do not match`);
                    };

                    vobObj = {
                        _id: voi,
                        root: reqObj.root,
                        owners: [reqObj.owner],
                        connections: reqObj.connections,
                        prev_voi: reqObj.prev_voi,
                        content: reqObj.content,
                        transaction: toi,
                    };
                    resObj = await appendContent(vobObj);
                } else {
                    throw new Error(`For tr_type param must be provided`);
                };
                break;
            default:
                throw new Error(`Provide valid action param`);
        };

        const sizeInBytes = new Blob([JSON.stringify(reqObj)]).size;

        const trObj = new Transaction({
            _id: toi,
            sign: reqObj.sig,
            tr_type: reqObj.tr_type,
            action: reqObj.action,
            owner: reqObj.owner,
            tr_obj: {
                root: vobObj.root,
                connections: vobObj.connections,
                prev_voi: vobObj.prev_voi,
                content: vobObj.content,
            },
            size: sizeInBytes,
        });

        await trObj.save();

        return {
            trObj,
            ...resObj,
        };
    } catch (error) {
        throw new Error(`Error while creating author: ${error}`);
    }
};
