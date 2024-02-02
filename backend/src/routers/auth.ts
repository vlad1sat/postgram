import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { body } from "express-validator";
const authRouter = Router();

authRouter.post(
    "/login",
    body("login").notEmpty().isString(),
    body("password").notEmpty().isString().isLength({ min: 8 }),
    AuthController.login,
);

authRouter.post(
    "/registration",
    body("username").notEmpty().isString().isLength({ min: 5, max: 20 }),
    body("email").isEmail(),
    body("password").notEmpty().isString().isLength({ min: 8 }),
    AuthController.registration,
);

authRouter.get("/refresh", AuthController.refresh);

export default authRouter;
