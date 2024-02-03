import type { IGenerateTokens } from "../utils/token/TokenService";
import type { IUserDto } from "../utils/token/UserDto";

interface IResponseAuth {
    tokens: IGenerateTokens;
    user: IUserDto;
}

export default IResponseAuth;
