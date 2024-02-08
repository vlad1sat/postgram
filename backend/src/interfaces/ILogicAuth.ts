import { type IGenerateTokens } from "../servises/TokenService";
import type IUserDto from "../utils/token/UserDto/IUserDto";

interface ILogicAuth {
    tokens: IGenerateTokens;
    user: IUserDto;
}

export default ILogicAuth;
