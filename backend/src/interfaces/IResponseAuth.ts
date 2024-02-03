import type { IUserDto } from "../utils/token/UserDto";
import { type IGenerateTokens } from "../servises/TokenService";

interface IResponseAuth {
    tokens: IGenerateTokens;
    user: IUserDto;
}

export default IResponseAuth;
