import { Router } from "express";
import AuthController from "../controllers/AuthController";

import {
    emailValidator,
    loginValidator,
    passwordValidator,
    refreshTokenValidator,
} from "../middleware/authMiddlewares";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";
import jsonMiddleware from "../middleware/jsonMiddleware";
const authRouter: Router = Router();

authRouter.post(
    "/login",
    loginValidator("login"),
    jsonMiddleware,
    passwordValidator(),
    errorsValidatorMiddleware,
    AuthController.login,
);

authRouter.post(
    "/registration",
    loginValidator("username"),
    jsonMiddleware,
    emailValidator(),
    passwordValidator(),
    errorsValidatorMiddleware,
    AuthController.registration,
);

authRouter.get(
    "/refresh",
    refreshTokenValidator(),
    errorsValidatorMiddleware,
    AuthController.refresh,
);

authRouter.get(
    "/logout",
    refreshTokenValidator(),
    errorsValidatorMiddleware,
    AuthController.logout,
);

export default authRouter;
