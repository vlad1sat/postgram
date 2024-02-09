import { body, type ValidationChain } from "express-validator";

export const createComment = (): ValidationChain[] => [
    body("text")
        .notEmpty()
        .withMessage("Поле text обязательно.")
        .isString()
        .withMessage("Комментарий должен быть строкой.")
        .isLength({ max: 1000 }),
    body("postID").notEmpty().isString().isLength({ max: 1000 }),
];
