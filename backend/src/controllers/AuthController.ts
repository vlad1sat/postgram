import { type NextFunction, type Request, type Response } from "express";
import UserModel from "../dal/models/User";
import type IRequestUser from "../interfaces/IRequestUser";
import AuthService from "../servises/AuthService";
import {
    type Result,
    type ValidationError,
    validationResult,
} from "express-validator";
import ApiError from "../utils/logicErrors/ApiError";
import type IRequestLoginUser from "../interfaces/IRequestLoginUser";
class AuthController {
    async registration(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const errors: Result<ValidationError> = validationResult(req);
            if (!errors.isEmpty()) {
                next(ApiError.BadRequest("Ошибка валидации", errors.array()));
                return;
            }
            const {
                tokens: { accessToken, refreshToken },
                user,
            } = await AuthService.registration(req.body as IRequestUser);
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(201).json({
                accessToken,
                user,
            });
        } catch (e) {
            next(e);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const errors: Result<ValidationError> = validationResult(req);
            if (!errors.isEmpty()) {
                next(ApiError.BadRequest("Ошибка валидации", errors.array()));
                return;
            }
            const {
                tokens: { accessToken, refreshToken },
                user,
            } = await AuthService.login(req.body as IRequestLoginUser);
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(201).json({
                accessToken,
                user,
            });
        } catch (e) {
            next(e);
        }
    }

    refresh(req: Request, res: Response) {}
}

export default new AuthController();
