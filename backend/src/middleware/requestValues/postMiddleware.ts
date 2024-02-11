import { body, param, type ValidationChain } from "express-validator";
export const paramsIDValidator = (): ValidationChain =>
    param("id").notEmpty().isString().isLength({ max: 1000 });

export const createPostValidator = (): ValidationChain[] => [
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
    body("images").notEmpty().isArray(),
];

export const updatePostValidator = (): ValidationChain[] => [
    ...createPostValidator(),
    body("id").notEmpty().isString().isLength({ max: 1000 }),
];
