import mongoose, { Error } from "mongoose";
import * as config from "../configs";

const connectDb = () => {
    try {
        mongoose.connect(config.MONGO_URI || "mongodb://127.0.0.1:27017/test");
    } catch (error) {
        throw new Error(`Error while connecting to DB: ${error}`);
    }
};

export default connectDb;
