import { Router } from "express";
import AuthController from "../controllers/AuthController";

import {
    emailValidator,
    loginValidator,
    passwordValidator,
    refreshTokenValidator,
} from "../middleware/authMiddlewares";
const authRouter = Router();

authRouter.post(
    "/login",
    loginValidator("login"),
    passwordValidator,
    AuthController.login,
);

authRouter.post(
    "/registration",
    loginValidator("username"),
    emailValidator,
    passwordValidator,
    AuthController.registration,
);

authRouter.get("/refresh", refreshTokenValidator, AuthController.refresh);
authRouter.get("/logout", refreshTokenValidator, AuthController.logout);

export default authRouter;
