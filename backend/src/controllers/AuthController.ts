import { type NextFunction, type Request, type Response } from "express";
import type IRequestUser from "../interfaces/IRequestUser";
import AuthService from "../servises/AuthService";
import ApiError from "../utils/logicErrors/ApiError";
import type IRequestLoginUser from "../interfaces/IRequestLoginUser";
import type RequestCookieRefreshToken from "../utils/token/RequestCookieRefreshToken";
import type IResponseAuth from "../interfaces/response/IResponseAuth";
import TokenService, { type IGenerateTokens } from "../servises/TokenService";
import type IUserDto from "../utils/token/UserDto/IUserDto";

class AuthController {
    async registration(
        req: Request<{}, {}, IRequestUser>,
        res: Response<IResponseAuth>,
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
        res: Response<IResponseAuth>,
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
        req: RequestCookieRefreshToken,
        res: Response<IResponseAuth>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken: string = TokenService.haveRefreshToken(req);
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

    async logout(
        req: RequestCookieRefreshToken,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken: string = TokenService.haveRefreshToken(req);
            await TokenService.removeRefreshTokenDB(refreshToken);
            res.clearCookie("refreshToken");
            res.sendStatus(200);
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
