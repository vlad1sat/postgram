import { type Request } from "express";
import type IUserDto from "../../utils/token/UserDto/IUserDto";

interface IRequestUserAuth<ReqBody = {}, Params = {}>
    extends Request<Params, {}, ReqBody> {
    user?: IUserDto;
}

export default IRequestUserAuth;
