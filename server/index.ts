import express from "express";
import cors from "cors";
import connectDb from "./db/index.ts";
import * as config from "./configs";

import * as AuthorController from "./controllers/author.controllers.ts";
import * as ContentController from "./controllers/content.controllers.ts";

const app = express();

app.use(express.json());
app.use(cors(config.CORS_CONFIG));

app.get("/author", AuthorController.getAuthors);
app.get("/author/:id", AuthorController.getAuthor);
app.patch("/author/:id", AuthorController.patchAuthor);
app.post("/author", AuthorController.postAuthor);
app.delete("/author", AuthorController.deleteAuthor);

app.get("/content", ContentController.getContentObjs);
app.get("/content/:id", ContentController.getContent);
app.patch("/content/:id", ContentController.patchContent);
app.post("/content", ContentController.postContent);
app.delete("/content", ContentController.deleteContent);

const startServer = async () => {
    try {
        connectDb();
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
};

startServer();
