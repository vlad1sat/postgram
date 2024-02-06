import { type Request } from "express";
import type IUserDto from "../utils/token/UserDto/IUserDto";
import type fileUpload from "express-fileupload";

interface IRequestImages<ReqBody = {}, Params = {}>
    extends Request<Params, {}, ReqBody> {
    images?: fileUpload.UploadedFile[];
}

export default IRequestImages;
