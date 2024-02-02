import type IRequestUser from "../interfaces/IRequestUser";
import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import bcrypt from "bcrypt";
import User from "../dal/models/User";
import ApiError from "../utils/logicErrors/ApiError";
import TokenService, {
    type IGenerateTokens,
} from "../utils/token/TokenService";
import UserDto, { type IUserDto } from "../utils/token/UserDto";
import type IRequestLoginUser from "../interfaces/IRequestLoginUser";
import tokenService from "../utils/token/TokenService";

class AuthService {
    async registration(
        user: IRequestUser,
    ): Promise<{ tokens: IGenerateTokens; user: IUserDto }> {
        const { username, email, password } = user;
        const userDB: IUserDB | null = await UserModel.findOne({
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
        const tokens: IGenerateTokens = TokenService.generateToken({
            ...newUser,
        });

        return {
            tokens,
            user: newUser,
        };
    }

    async login(
        userData: IRequestLoginUser,
    ): Promise<{ tokens: IGenerateTokens; user: IUserDto }> {
        const { login, password: passwordData } = userData;
        const user: IUserDB | null = await UserModel.findOne({
            $or: [{ username: login }, { email: login }],
        });
        if (user == null) {
            throw ApiError.BadRequest("Такого пользователя не существует!");
        }
        const { password } = user;
        const isCorrectPassword: boolean = await bcrypt.compare(
            passwordData,
            password,
        );
        if (!isCorrectPassword) {
            throw ApiError.BadRequest("Неверный пароль!");
        }
        const userDto: UserDto = new UserDto(user);
        const tokens: IGenerateTokens = TokenService.generateToken({
            ...userDto,
        });
        return {
            tokens,
            user: userDto,
        };
    }

    refresh() {}
}

export default new AuthService();
