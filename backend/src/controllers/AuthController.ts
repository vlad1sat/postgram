import { type NextFunction, type Request, type Response } from "express";
import UserModel from "../dal/models/User";
import type IRequestUser from "../interfaces/IRequestUser";
import AuthService from "../servises/AuthService";
import { Result, ValidationError, validationResult } from "express-validator";
import ApiError from "../utils/logicErrors/ApiError";
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
            const user = req.body as IRequestUser;
            await AuthService.registration(user);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }

    login(req: Request, res: Response) {}

    refresh(req: Request, res: Response) {}
}

export default new AuthController();
