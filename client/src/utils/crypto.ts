import { ec as EC } from "elliptic";
import hash from "object-hash";
import { SignAppendAuthorObjType, SignAppendContentObjType, SignCreateAuthorObjType, SignCreateContentObjType } from "../types";

var curve = "secp256k1";

export const getKeyPair = () => {
    const ec = new EC(curve);

    const pair = ec.genKeyPair();
    const publicKey = pair.getPublic().encode("hex", true);
    const privateKey = pair.getPrivate().toString("hex");

    return {
        pair,
        publicKey,
        privateKey,
    };
};

export const signMsg = (priv_key: string, objMsg: SignAppendAuthorObjType | SignAppendContentObjType | SignCreateContentObjType | SignCreateAuthorObjType) => {
    const ec = new EC(curve);

    let objToHash;
    switch (objMsg.type) {
        case "create-author":
            objToHash = {
                connections: objMsg.connections,
                content: {
                    bio: objMsg.content.bio,
                    name: objMsg.content.name,
                    nickname: objMsg.content.nickname,
                },
            };
            break;
        case "create-content":
            objToHash = {
                connections: objMsg.connections,
                content: {
                    body: objMsg.content.body,
                },
            };
            break;
        case "append-author":
            objToHash = {
                root: objMsg.root,
                connections: objMsg.connections,
                prev_voi: objMsg.prev_voi,
                content: {
                    bio: objMsg.content.bio,
                    name: objMsg.content.name,
                    nickname: objMsg.content.nickname,
                },
            };
            break;
        case "append-content":
            objToHash = {
                root: objMsg.root,
                connections: objMsg.connections,
                prev_voi: objMsg.prev_voi,
                content: {
                    body: objMsg.content.body,
                },
            };
            break;
        default:
            throw new Error(`Wrong object <type> param to sign`)
    };

    const keys = ec.keyFromPrivate(priv_key);
    const pub_key = keys.getPublic().encode("hex", true);

    const hashedMsg = hash(objToHash, { algorithm: "sha1" });
    const msgSign = keys.sign(hashedMsg);
    const encodedSign = msgSign.toDER().map(byte => ('0' + byte.toString(16)).slice(-2)).join('');

    return {
       encodedSign,
       pub_key
    };
};