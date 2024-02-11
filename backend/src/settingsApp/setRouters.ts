import { type Express } from "express";
import authRouter from "../routers/auth";
import postsRouter from "../routers/posts";
import formDataMiddleware from "../middleware/typeRequest/formDataMiddleware";
import { imageMiddleware } from "../middleware/requestValues/imageMiddleware";
import imageRouter from "../routers/image";
import usersRouter from "../routers/users";
import commentsRouter from "../routers/comments";
import errorMiddleware from "../middleware/errorMiddleware";
import authMiddleware from "../middleware/logicAuthMiddleware";

export const setRouters = (app: Express): void => {
    app.use("/auth", authRouter);
    app.use("/posts", postsRouter);
    app.use(
        "/images",
        authMiddleware,
        formDataMiddleware,
        imageMiddleware,
        imageRouter,
    );
    app.use("/users", usersRouter);
    app.use("/comments", commentsRouter);
    app.use(errorMiddleware);
};
