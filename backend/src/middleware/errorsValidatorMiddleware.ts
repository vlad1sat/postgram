import {
    type Result,
    type ValidationError,
    validationResult,
} from "express-validator";
import { type Response, type Request, type NextFunction } from "express";
import ApiError from "../utils/logicErrors/ApiError";

const errorsValidatorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        return;
    }
    next();
};
export default errorsValidatorMiddleware;
