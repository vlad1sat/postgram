import { body, cookie, type ValidationChain } from "express-validator";

const letterMessage = (prop: string): string =>
    `${prop} должен содержать только английские буквы в верхнем и нижнем регистре`;

const lengthMessage = (prop: string): string =>
    `Длинна ${prop} не менее 8 символов.`;

const minLength: number = 8;
const maxLength: number = 300;

export const loginValidator = (prop: string): ValidationChain =>
    body(prop)
        .notEmpty()
        .withMessage(`Поле ${prop} обязательно и не может быть пустым.`)
        .isString()
        .withMessage(`Поле ${prop} должно передаваться строкой.`)
        .isLength({ min: minLength, max: maxLength })
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
    .isLength({ max: maxLength });

export const refreshTokenValidator: ValidationChain = cookie("refreshToken")
    .notEmpty()
    .isString();

export const passwordValidator: ValidationChain = body("password")
    .notEmpty()
    .isString()
    .isLength({ min: minLength, max: maxLength })
    .withMessage(letterMessage("Пароль"))
    .matches(/[A-Z, a-z]/)
    .withMessage(letterMessage("Пароль"))
    .matches(/[0-9]/)
    .withMessage("Пароль должен содержать цифры.");
