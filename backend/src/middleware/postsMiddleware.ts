import { body, cookie, param, type ValidationChain } from "express-validator";
import ApiError from "../utils/logicErrors/ApiError";

export const paramsIDValidator: ValidationChain = param("id")
    .notEmpty()
    .isString()
    .isLength({ max: 1000 });

export const createPostValidator: ValidationChain[] = [
    body("name")
        .notEmpty()
        .isString()
        .isLength({ max: 1000 })
        .withMessage("Максимум 1000 символов."),
    body("description")
        .notEmpty()
        .isString()
        .isLength({ max: 10000 })
        .withMessage("Максимум 10000 символов."),
    body("images")
        .notEmpty()
        .custom((images: unknown) => {
            if (!Array.isArray(images)) {
                throw ApiError.BadRequest("Поле images должно быть массивом.");
            }
            if (!images.every((image: unknown) => typeof image === "string")) {
                throw ApiError.BadRequest(
                    "Поле images должно содержать только строки.",
                );
            }
        }),
];

export const updatePostValidator: ValidationChain[] = [
    ...createPostValidator,
    body("id").notEmpty().isString(),
];
