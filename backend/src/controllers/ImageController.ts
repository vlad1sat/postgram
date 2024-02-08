import { type Response, type NextFunction } from "express";
import ApiError from "../utils/logicErrors/ApiError";
import ImageService from "../servises/ImageService";
import type IResponseImages from "../interfaces/response/IResponseImages";
import type IRequestImages from "../interfaces/request/IRequestImages";
import type fileUpload from "express-fileupload";

class ImageController {
    async postImage(
        req: IRequestImages,
        res: Response<IResponseImages>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const file: fileUpload.UploadedFile[] | undefined = req.images;
            if (file == null) {
                next(ApiError.BadRequest("Некорректный формат передачи файла"));
                return;
            }
            const imageSrc = await ImageService.postImages(file);
            res.status(200).json(imageSrc);
        } catch (e) {
            next(e);
        }
    }
}

export default new ImageController();
