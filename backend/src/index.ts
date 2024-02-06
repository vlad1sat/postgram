import express from "express";
import authRouter from "./routers/auth";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import postsRouter from "./routers/posts";
import jsonMiddleware from "./middleware/jsonMiddleware";
import fileUpload from "express-fileupload";
import formDataMiddleware from "./middleware/formDataMiddleware";
import imageRouter from "./routers/image";
import { imageMiddleware } from "./middleware/imageMiddleware";

const PORT = process.env.PORT ?? 5001;
const app = express();
app.use(express.static("static/images"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
    fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
        responseOnLimit: "Файл превышает допустимые значения!",
        abortOnLimit: true,
    }),
);
app.use("/auth", jsonMiddleware, authRouter);
app.use("/posts", jsonMiddleware, postsRouter);
app.use("/images", formDataMiddleware, imageMiddleware, imageRouter);
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
