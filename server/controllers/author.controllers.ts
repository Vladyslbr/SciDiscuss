import { Request, Response } from "express";

import { viewAuthor } from "../db/author.db.ts";
import { ActionTypesEnum, AppendAuthorType, CreateAuthorType, TrTypeEnum } from "../types";
import { checkConsistency, getAuthorUtil, getAuthorsUtil, getPrevVoiUtil } from "../utils/index.ts";
import { processTransaction } from "../db/transaction.db.ts";

export const postAuthor = async (req: Request, res: Response) => {
    try {
        // set params by router
        const setTrType = TrTypeEnum.AUTHOR;
        const setTrAction = ActionTypesEnum.CREATE;

        const reqObj = {
            sig: req.body.sig,
            owner: req.body.owner,
            connections: req.body.connections,
            content: req.body.content,
            tr_type: setTrType,
            action: setTrAction,
        } as CreateAuthorType;

        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to post author: ${error.message}`,
        });
    }
};

export const patchAuthor = async (req: Request, res: Response) => {
    try {
        const param = req.params.id;

        // set params by router
        const setTrType = TrTypeEnum.AUTHOR;
        const setTrAction = ActionTypesEnum.APPEND;

        const prev_voi = await getPrevVoiUtil(param);

        const reqObj = {
            sig: req.body.sig,
            owner: req.body.owner,
            root: param,
            connections: req.body.connections,
            prev_voi,
            content: req.body.content,
            tr_type: setTrType,
            action: setTrAction,
        } as AppendAuthorType;


        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to patch author: ${error.message}`,
        });
    }
};

export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        // set params by router
        const setTrType = TrTypeEnum.AUTHOR;
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
        } as AppendAuthorType;

        if (checkConsistency(reqObj)) {
            return res.status(400).json({ message: 'Request object contains undefined properties' });
        };

        const data = await processTransaction(reqObj);

        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to delete author: ${error.message}`,
        });
    }
};

export const getAuthor = async (req: Request, res: Response) => {
    try {
        const param = req.params.id;
        const paramType = param.split(/::/)[0];

        if (paramType === "AOI") {
            var data = await viewAuthor(param);
        } else if (paramType === "VOI") {
            var data = await viewAuthor(undefined, param);
        } else {
            throw new Error(`Param should be id of type <VOI::<hash>> or <AOI::<hash>>`);
        };

        const comObj = await getAuthorUtil({ authorObj: data.authorObj, vob: data.vobObj });

        res.status(201).json(comObj);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to get author: ${error.message}`,
        });
    }
};

export const getAuthors = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.body.limit);
        const ids = req.body.ids;

        const comObj = await getAuthorsUtil(limit, ids);

        res.status(201).json(comObj);
    } catch (error: any) {
        res.status(500).json({
            message: `Problem to get authors: ${error.message}`,
        });
    }
};
