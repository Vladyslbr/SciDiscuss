const {
    DB_URL,
    DB_PORT,
    DB_NAME,
    DB_TYPE,
    DB_MONGO_URI
} = process.env;

export const MONGO_URI = DB_TYPE === "local"
    ? `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`
    : DB_MONGO_URI;
