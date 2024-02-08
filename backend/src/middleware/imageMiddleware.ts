import ApiError from "../utils/logicErrors/ApiError";
import { type Response, type NextFunction } from "express";
import ImageService from "../servises/ImageService";
import type IRequestImages from "../interfaces/request/IRequestImages";

export const imageMiddleware = (
    req: IRequestImages,
    res: Response,
    next: NextFunction,
): void => {
    const images = req.files?.images;
    if (images == null) {
        next(ApiError.BadRequest("Некорректный формат передачи файла"));
        return;
    }

    if (!Array.isArray(images)) {
        if (ImageService.isImage(images)) {
            req.images = [images];
            next();
            return;
        }
        next(ApiError.BadRequest("Некорректный формат передачи файла"));
        return;
    }

    if (images.every(ImageService.isImage)) {
        req.images = images;
        next();
        return;
    }

    next(ApiError.BadRequest("Некорректный формат передачи файла"));
};
