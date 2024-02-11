import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

export const setParams = (app: Express): void => {
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
};
