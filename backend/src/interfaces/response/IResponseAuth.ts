import type IUserDto from "../../utils/token/UserDto/IUserDto";

interface IResponseAuth {
    accessToken: string;
    user: IUserDto;
}

export default IResponseAuth;
