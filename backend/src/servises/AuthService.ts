import type IRequestUser from "../interfaces/IRequestUser";
import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import bcrypt from "bcrypt";
import User from "../dal/models/User";
import ApiError from "../utils/logicErrors/ApiError";
import TokenService, {
    type IGenerateTokens,
} from "../utils/token/TokenService";
import UserDto, { type IUserDto } from "../utils/token/UserDto";

class AuthService {
    async registration(
        user: IRequestUser,
    ): Promise<{ tokens: IGenerateTokens; user: IUserDto }> {
        const { username, email, password } = user;
        const userDB = await UserModel.findOne({
            $or: [{ username }, { email }],
        });
        if (userDB !== null) {
            throw ApiError.BadRequest(
                "Пользователь с такими данными уже существует!",
            );
        }
        const hashPassword: string = await bcrypt.hash(password, 5);
        const createdUserDB: IUserDB = await UserModel.create(
            new User({ ...user, password: hashPassword }),
        );

        const newUser: IUserDto = new UserDto(createdUserDB);
        const tokens = TokenService.generateToken({
            ...newUser,
        });

        return {
            tokens,
            user: newUser,
        };
    }

    login() {}

    refresh() {}
}

export default new AuthService();
