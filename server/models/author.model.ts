import mongoose from "mongoose";
import { AuthorType } from "../types";

const AuthorSchema = new mongoose.Schema<AuthorType>(
    {
        _id: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    },
);

export default mongoose.model<AuthorType>("author", AuthorSchema);
