import { Router } from "express";
import { paramsIDValidator } from "../middleware/requestValues/postMiddleware";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";
import CommentController from "../controllers/CommentController";
import authMiddleware from "../middleware/logicAuthMiddleware";
import {
    createCommentValidator,
    updateCommentValidator,
} from "../middleware/requestValues/commentMidleware";

const commentsRouter: Router = Router();

commentsRouter.get("/", CommentController.getComments)

commentsRouter.get(
    "/:id",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    CommentController.getCommentByID,
);

commentsRouter.post(
    "/",
    authMiddleware,
    createCommentValidator(),
    errorsValidatorMiddleware,
    CommentController.postComment,
);

commentsRouter.put(
    "/",
    authMiddleware,
    updateCommentValidator(),
    errorsValidatorMiddleware,
    CommentController.updateComment,
);

commentsRouter.delete(
    "/:id",
    authMiddleware,
    paramsIDValidator(),
    errorsValidatorMiddleware,
    CommentController.deleteComment,
);

export default commentsRouter;
