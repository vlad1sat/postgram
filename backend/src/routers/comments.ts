import { Router } from "express";
import { paramsIDValidator } from "../middleware/postsMiddleware";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";
import CommentController from "../controllers/CommentController";
import authMiddleware from "../middleware/logicAuthMiddleware";
import { createComment } from "../middleware/commentMidleware";

const commentsRouter: Router = Router();

commentsRouter.get(
    "/:id",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    CommentController.getCommentByID,
);

commentsRouter.post(
    "/",
    authMiddleware,
    createComment(),
    errorsValidatorMiddleware,
    CommentController.postComment,
);

commentsRouter.put("/", authMiddleware, CommentController.updateComment);

commentsRouter.delete(
    "/:id",
    authMiddleware,
    paramsIDValidator(),
    errorsValidatorMiddleware,
    CommentController.deleteComment,
);

export default commentsRouter;
