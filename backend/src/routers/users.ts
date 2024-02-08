import { Router } from "express";
import UserController from "../controllers/UserController";
import { paramsIDValidator } from "../middleware/postsMiddleware";
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
    "/posts/:id",
    paramsIDValidator(),
    errorsValidatorMiddleware,
    UserController.getUserPosts,
);

export default usersRouter;
