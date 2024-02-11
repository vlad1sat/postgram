import { Router } from "express";
import PostController from "../controllers/PostController";
import logicAuthMiddleware from "../middleware/logicAuthMiddleware";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";
import {
    createPostValidator,
    paramsIDValidator,
    updatePostValidator,
} from "../middleware/requestValues/postMiddleware";
import jsonMiddleware from "../middleware/typeRequest/jsonMiddleware";

export { Router } from "express";

const postsRouter: Router = Router();

postsRouter.get("/", PostController.getAllPosts);

postsRouter.get(
    "/:id",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    PostController.getPostByID,
);

postsRouter.post(
    "/",
    logicAuthMiddleware,
    jsonMiddleware,
    createPostValidator(),
    errorsValidatorMiddleware,
    PostController.createPost,
);

postsRouter.put(
    "/",
    logicAuthMiddleware,
    jsonMiddleware,
    updatePostValidator(),
    errorsValidatorMiddleware,
    PostController.updatePost,
);

postsRouter.delete(
    "/:id",
    logicAuthMiddleware,
    paramsIDValidator(),
    errorsValidatorMiddleware,
    PostController.deletePost,
);

export default postsRouter;
