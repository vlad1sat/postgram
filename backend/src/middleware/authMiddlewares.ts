import { body, cookie, type ValidationChain } from "express-validator";

const letterMessage = (prop: string): string =>
    `${prop} должен содержать только английские буквы в верхнем и нижнем регистре`;

const lengthMessage = (prop: string): string =>
    `Длинна ${prop} не менее 8 символов.`;

export const loginValidator = (prop: string): ValidationChain =>
    body(prop)
        .notEmpty()
        .isString()
        .isLength({ min: 8, max: 300 })
        .withMessage(lengthMessage(prop))
        .matches(/[A-Z, a-z]/)
        .withMessage(letterMessage(prop));

export const emailValidator: ValidationChain = body("email")
    .notEmpty()
    .isString()
    .matches(/[A-Z, a-z]/)
    .withMessage(letterMessage("Email"))
    .isEmail()
    .withMessage("Невалидное значение email.")
    .isLength({ max: 300 });

export const refreshTokenValidator: ValidationChain = cookie("refreshToken")
    .notEmpty()
    .isString();

export const passwordValidator: ValidationChain = body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 300 })
    .withMessage(letterMessage("Пароль"))
    .matches(/[A-Z, a-z]/)
    .withMessage(letterMessage("Пароль"))
    .matches(/[0-9]/)
    .withMessage("Пароль должен содержать цифры.");
