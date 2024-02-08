import { type NextFunction, type Request, type Response } from "express";
import type IRequestUser from "../interfaces/request/IRequestUser";
import AuthService from "../servises/AuthService";
import type IRequestLoginUser from "../interfaces/request/IRequestLoginUser";
import type RequestCookieRefreshToken from "../utils/token/RequestCookieRefreshToken";
import type ILogicAuth from "../interfaces/ILogicAuth";
import TokenService from "../servises/TokenService";
import type IResponseAuth from "../interfaces/response/IResponseAuth";
import defaultEnv from "../defaultEnv";
import DateLogic from "../utils/DateLogic";

const timeRefreshTokenDay: string =
    process.env.VALID_TIME_REFRESH_TOKEN_DAY ??
    defaultEnv.VALID_TIME_REFRESH_TOKEN_DAY;

const nameRefreshToken: string = "refreshToken";
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
            res.clearCookie(nameRefreshToken);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    private static async userAuth(
        req: Request,
        res: Response<IResponseAuth>,
        next: NextFunction,
        service: () => Promise<ILogicAuth>,
        statusCode: number = 200,
    ): Promise<void> {
        try {
            const {
                tokens: { accessToken, refreshToken },
                user,
            } = await service();
            res.cookie(nameRefreshToken, refreshToken, {
                maxAge: DateLogic.convertDaysToMilliseconds(
                    +timeRefreshTokenDay,
                ),
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
