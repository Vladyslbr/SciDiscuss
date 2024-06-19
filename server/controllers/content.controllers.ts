import { Request, Response } from "express";

import { viewContent } from "../db/content.db.ts";
import { ActionTypesEnum, AppendContentType, CreateContentType, TrTypeEnum } from "../types";
import { checkConsistency, getContentObjUtil, getContentObjsUtil, getRootUtil } from "../utils/index.ts";
import { processTransaction } from "../db/transaction.db.ts";

export const postContent = async (req: Request, res: Response) => {
    try {
        // set params by router
        const setTrType = TrTypeEnum.CONTENT;
        const setTrAction = ActionTypesEnum.CREATE;

        const reqObj = {
            sig: req.body.sig,
            owner: req.body.owner,
            connections: req.body.connections,
            content: req.body.content,
            type: req.body.type,
            tr_type: setTrType,
            action: setTrAction,
        } as CreateContentType;

        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to post content object: ${error.message}`,
        });
    }
};

export const patchContent = async (req: Request, res: Response) => {
    try {
        const param = req.params.id;
        
        // set params by router
        const setTrType = TrTypeEnum.CONTENT;
        const setTrAction = ActionTypesEnum.APPEND;

        const root = await getRootUtil(param);

        const reqObj = {
            sig: req.body.sig,
            owner: req.body.owner,
            root,
            connections: req.body.connections,
            prev_voi: param,
            content: req.body.content,
            tr_type: setTrType,
            action: setTrAction,
        } as AppendContentType;

        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to patch content object: ${error.message}`,
        });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        // set params by router
        const setTrType = TrTypeEnum.CONTENT;
        const setTrAction = ActionTypesEnum.SHADOW;

        const reqObj = {
            sig: req.body.sig,
            owner: req.body.owner,
            root: req.body.root,
            connections: req.body.connections,
            prev_voi: req.body.prev_voi,
            content: req.body.content,
            tr_type: setTrType,
            action: setTrAction,
        } as AppendContentType;

        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to delete content object: ${error.message}`,
        });
    }
};

export const getContent = async (req: Request, res: Response) => {
    try {
        const param = req.params.id;
        const paramType = param.split(/::/)[0];

        if (paramType === "POI") {
            var data = await viewContent(param);
        } else if (paramType === "VOI") {
            var data = await viewContent(undefined, param);
        } else {
            throw new Error(`Param should be id of type <VOI::<hash>> or <POI::<hash>>`);
        };

        const comObj = await getContentObjUtil({ pob: data.pobObj, vobs: data.vobObjs });

        res.status(201).json(comObj);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to get content object: ${error.message}`,
        });
    }
};

export const getContentObjs = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.params.limit);
        const vobIds = req.query.vobIds as string[];
        const owners = req.query.owners as string[];
        const searchValue = req.query.searchValue as string;

        const comObjs = await getContentObjsUtil(limit, vobIds, owners, searchValue);

        res.status(201).json(comObjs);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to get content objects: ${error.message}`,
        });
    }
};
