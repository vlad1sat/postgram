import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/logicErrors/ApiError";


const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): Response => {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.odjMessage());
    }
    return res.status(500).json(`Ошибка сервера! ${String(err)}`);
};

export default errorMiddleware;
