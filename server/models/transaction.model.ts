import mongoose from "mongoose";
import { TransactionType } from "../types";

const TransactionSchema = new mongoose.Schema<TransactionType>(
    {
        _id: {
            type: String,
            required: true,
        },
        sign: {
            type: String,
            required: true,
        },
        tr_type: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            ref: "author",
        },
        tr_obj: {
            type: Object,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    },
);

export default mongoose.model<TransactionType>(
    "transaction",
    TransactionSchema,
);
