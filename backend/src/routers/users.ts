import { Router } from "express";
import UserController from "../controllers/UserController";
import { paramsIDValidator } from "../middleware/requestValues/postMiddleware";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";

const usersRouter: Router = Router();

usersRouter.get("/", UserController.getUsers);

usersRouter.get(
    "/:id",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    UserController.getUserByID,
);

usersRouter.get(
    "/:id/posts",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    UserController.getUserPosts,
);

export default usersRouter;
