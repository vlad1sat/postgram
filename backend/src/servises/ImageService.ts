import { type UploadedFile } from "express-fileupload";
import * as uuid from "uuid";
import * as path from "path";
import type IResponseImages from "../interfaces/response/IResponseImages";
import * as fs from "fs";

class ImageService {
    async postImages(images: UploadedFile[]): Promise<IResponseImages> {
        const srcImages: string[] = await Promise.all(
            images.map(async (image: UploadedFile): Promise<string> => {
                console.log(image);
                const fileName: string = uuid.v4() + this.extensionFile(image);
                await image.mv(this.filePath(fileName));
                return fileName;
            }),
        );

        return {
            images: srcImages,
        };
    }

    deleteImages(srcImages: string[]): void {
        srcImages.forEach((srcImage: string) => {
            fs.unlink(this.filePath(srcImage), (err) => {
                if (err != null) {
                    console.log(
                        `Ошибка удаления изображения ${srcImage}, ${err.message}`,
                    );
                }
            });
        });
    }

    isImage(file: UploadedFile): boolean {
        return file.mimetype.split("/")[0] === "image";
    }

    private filePath(srcImage: string): string {
        return path.resolve("static/images", srcImage);
    }

    private extensionFile(image: UploadedFile): string {
        const extension: string = image.mimetype.split("/")[1];
        return (
            "." +
            (extension.startsWith("svg") ? extension.split("+")[0] : extension)
        );
    }
}

export default new ImageService();
