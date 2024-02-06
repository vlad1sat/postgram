import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/logicErrors/ApiError";

const jsonMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (req.is("multipart/form-data") === false) {
        next(
            ApiError.BadRequest(
                "Тело запроса не соответствует form-data формату.",
            ),
        );
        return;
    }
    next();
};

export default jsonMiddleware;
