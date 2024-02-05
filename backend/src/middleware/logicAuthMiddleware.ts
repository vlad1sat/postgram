import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/logicErrors/ApiError";
import TokenService from "../servises/TokenService";
import UserDto from "../utils/token/UserDto/UserDto";
import { instanceOfIUserDto } from "../utils/token/UserDto/IUserDto";
import RequestUserAuth from "../interfaces/RequestUserAuth";

const authMiddleware = (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const authResponse: string | undefined = req.headers?.authorization;
        if (authResponse === undefined) {
            next(ApiError.Unauthorized());
            return;
        }
        const accessToken: string = authResponse.split(" ")[1];
        const correctToken = TokenService.correctAccessToken(accessToken);
        if (correctToken === null || !instanceOfIUserDto(correctToken)) {
            next(ApiError.Unauthorized());
            return;
        }
        req.user = correctToken;
        next();
    } catch (e) {
        next(ApiError.Unauthorized());
    }
};

export default authMiddleware;
