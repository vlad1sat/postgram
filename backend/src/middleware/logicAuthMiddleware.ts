import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/logicErrors/ApiError";
import TokenService from "../servises/TokenService";

const authMiddleware = (
    req: Request,
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
        const isCorrectToken = TokenService.correctAccessToken(accessToken);
        if (isCorrectToken === null) {
            next(ApiError.Unauthorized());
            return;
        }
        next();
    } catch (e) {
        next(ApiError.Unauthorized());
    }
};

export default authMiddleware;
