import { Router } from "express";
import AuthController from "../controllers/AuthController";

import {
    emailValidator,
    loginValidator,
    passwordValidator,
    refreshTokenValidator,
} from "../middleware/authMiddlewares";
import errorsValidatorMiddleware from "../middleware/errorsValidatorMiddleware";
const authRouter: Router = Router();

authRouter.post(
    "/login",
    loginValidator("login"),
    passwordValidator,
    errorsValidatorMiddleware,
    AuthController.login,
);

authRouter.post(
    "/registration",
    loginValidator("username"),
    emailValidator,
    passwordValidator,
    errorsValidatorMiddleware,
    AuthController.registration,
);

authRouter.get(
    "/refresh",
    refreshTokenValidator,
    errorsValidatorMiddleware,
    AuthController.refresh,
);

authRouter.get(
    "/logout",
    refreshTokenValidator,
    errorsValidatorMiddleware,
    AuthController.logout,
);

export default authRouter;
