import { type Request } from "express";
import type IUserDto from "../utils/token/UserDto/IUserDto";

interface RequestUserAuth<ReqBody = {}, Params = {}>
    extends Request<Params, {}, ReqBody> {
    user?: IUserDto;
}

export default RequestUserAuth;
