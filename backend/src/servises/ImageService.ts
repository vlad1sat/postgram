import type fileUpload from "express-fileupload";
import * as uuid from "uuid";
import * as path from "path";
import type IResponseImages from "../interfaces/response/IResponseImages";
import * as fs from "fs";
class ImageService {
    async postImages(
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
            images: srcImages,
        };
    }

    deleteImages(srcImages: string[]) {
        srcImages.forEach((srcImage: string) => {
            const filepath: string = path.resolve("static/images", srcImage);
            fs.unlink(filepath, (err) => {
                if (err != null) {
                    console.log(
                        `Ошибка удаления изображения ${srcImage}, ${err.message}`,
                    );
                }
            });
        });
    }

    isImage(file: fileUpload.UploadedFile): boolean {
        return file.mimetype.split("/")[0] === "image";
    }
}

export default new ImageService();
