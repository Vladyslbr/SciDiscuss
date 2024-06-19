export const PORT = process.env.PORT || 3300;

export const CORS_CONFIG = {
    origin: process.env.CLIENT_ORIGIN || `http://localhost:3000`,
    optionsSuccessStatus: 200,
};