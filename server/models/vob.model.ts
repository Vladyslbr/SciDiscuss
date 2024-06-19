import mongoose from "mongoose";
import { VOBType } from "../types";

const VOBSchema = new mongoose.Schema<VOBType>(
    {
        _id: {
            type: String,
            required: true,
        },
        root: {
            type: String,
            ref: "author" || "pob",
            required: true,
        },
        owners: [
            {
                type: String,
                ref: "author",
            },
        ],
        connections: [
            {
                type: String,
                ref: "author" || "pob",
            },
        ],
        prev_voi: {
            type: String,
            ref: "voi",
            required: true,
        },
        content: {
            type: Object,
        },
        transaction: {
            type: String,
            ref: "toi",
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    },
);

export default mongoose.model<VOBType>("vob", VOBSchema);
