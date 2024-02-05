import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/logicErrors/ApiError";

const jsonMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (req.is("application/json") === false) {
        next(
            ApiError.BadRequest("Тело запроса не соответствует JSON-формату."),
        );
        return;
    }
    next();
};

export default jsonMiddleware;
