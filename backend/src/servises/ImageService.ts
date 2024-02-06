import type fileUpload from "express-fileupload";
import * as uuid from "uuid";
import * as path from "path";
import type IResponseImages from "../interfaces/response/IResponseImages";
class ImageService {
    async postImage(
        images: fileUpload.UploadedFile[],
    ): Promise<IResponseImages> {
        const srcImages: string[] = await Promise.all(
            images.map(
                async (image: fileUpload.UploadedFile): Promise<string> => {
                    const fileName: string =
                        uuid.v4() + "." + image.mimetype.split("/")[1];
                    const filepath: string = path.resolve(
                        "static/images",
                        fileName,
                    );
                    await image.mv(filepath);
                    return fileName;
                },
            ),
        );
        return {
            srcImages,
        };
    }

    isImage(file: fileUpload.UploadedFile): boolean {
        return file.mimetype.split("/")[0] === "image";
    }
}

export default new ImageService();
