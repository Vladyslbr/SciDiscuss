import { ec as EC } from "elliptic";
import hash from "object-hash";

import { ActionTypesEnum, SignAppendObjType, SignCreateObjType, TrTypeEnum, TransactionReqObjectType } from "../types";

export const getHash = (obj: Object) => {
    return hash(obj, { algorithm: "sha1" });
}

export const signVerify = (obj: TransactionReqObjectType) => {
    const curve = "secp256k1"

    const ec = new EC(curve);

    let signObj: SignAppendObjType | SignCreateObjType;
    if (obj.action === ActionTypesEnum.APPEND || obj.action === ActionTypesEnum.SHADOW) {
        if (obj.tr_type === TrTypeEnum.AUTHOR) {
            signObj = {
                root: obj.root,
                connections: obj.connections,
                content: obj.content,
            };
        } else if ((obj.tr_type === TrTypeEnum.CONTENT)) {
            signObj = {
                connections: obj.connections,
                prev_voi: obj.prev_voi,
                content: obj.content,
            };
        } else {
            throw new Error();
        };
    } else if (obj.action === ActionTypesEnum.CREATE) {
        signObj = {
            connections: obj.connections,
            content: obj.content,
        };
    } else {
        throw new Error();
    };

    const { sig, owner } = obj;
    const decodedSign = sig.match(/.{1,2}/g)?.map((byte: string) => parseInt(byte, 16));

    const hashedObj = getHash(signObj);
    const pubKeyHash = owner.split(/::/)[1];
    const keys = ec.keyFromPublic(pubKeyHash, "hex");
    const pubKey = keys.getPublic().encode("hex", true);

    if (decodedSign) {
        const verify = keys.verify(hashedObj, decodedSign);
        return {
            verify,
            pubKey
        };
    } else {
        throw new Error(`Cannot decode signature`);
    }
};