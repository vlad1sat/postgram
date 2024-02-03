import { type NextFunction, type Request, type Response } from "express";
import type IRequestUser from "../interfaces/IRequestUser";
import AuthService from "../servises/AuthService";
import {
    type Result,
    type ValidationError,
    validationResult,
} from "express-validator";
import ApiError from "../utils/logicErrors/ApiError";
import type IRequestLoginUser from "../interfaces/IRequestLoginUser";
import { type IGenerateTokens } from "../utils/token/TokenService";
import { type IUserDto } from "../utils/token/UserDto";
import type CookieRefreshTokenRequest from "../utils/token/CookieRefreshTokenRequest";
import type IResponseAuth from "../interfaces/IResponseAuth";

class AuthController {
    async registration(
        req: Request<{}, {}, IRequestUser>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        await AuthController.userAuth(
            req,
            res,
            next,
            async () => await AuthService.registration(req.body),
            201,
        );
    }

    async login(
        req: Request<{}, {}, IRequestLoginUser>,
        res: Response<Promise<{ tokens: IGenerateTokens; user: IUserDto }>>,
        next: NextFunction,
    ): Promise<void> {
        await AuthController.userAuth(
            req,
            res,
            next,
            async () => await AuthService.login(req.body),
        );
    }

    async refresh(
        req: CookieRefreshTokenRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { refreshToken } = req.cookies;
            await AuthController.userAuth(
                req,
                res,
                next,
                async () => await AuthService.refresh(refreshToken),
            );
        } catch (e) {
            next(e);
        }
    }

    private static async userAuth(
        req: Request,
        res: Response,
        next: NextFunction,
        service: () => Promise<IResponseAuth>,
        statusCode: number = 200,
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
            } = await service();
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(statusCode).json({
                accessToken,
                user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();
