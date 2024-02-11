import express from "express";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import { setRouters } from "./settingsApp/setRouters";
import { setParams } from "./settingsApp/setParams";

const PORT = process.env.PORT ?? 5001;
const app = express();
setParams(app);
setRouters(app);

void (async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
})();
