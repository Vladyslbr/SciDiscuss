import mongoose from "mongoose";
import { POBType } from "../types";

const POBSchema = new mongoose.Schema<POBType>(
    {
        _id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    },
);

export default mongoose.model<POBType>("pob", POBSchema);
