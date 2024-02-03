import type IRequestUser from "../interfaces/IRequestUser";
import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import bcrypt from "bcrypt";
import User from "../dal/models/User";
import ApiError from "../utils/logicErrors/ApiError";
import TokenService from "../utils/token/TokenService";
import tokenService, {
    type IGenerateTokens,
} from "../utils/token/TokenService";
import UserDto, { type IUserDto } from "../utils/token/UserDto";
import type IRequestLoginUser from "../interfaces/IRequestLoginUser";
import { type ITokenDB } from "../dal/mongoDB/schemas/refreshToken";
import type IResponseAuth from "../interfaces/IResponseAuth";

class AuthService {
    async registration(user: IRequestUser): Promise<IResponseAuth> {
        const { username, email, password } = user;
        //
        const userDB: IUserDB | null = await UserModel.findOne({
            $or: [{ username }, { email }],
        });
        if (userDB !== null) {
            throw ApiError.BadRequest(
                "Пользователь с такими данными уже существует!",
            );
        }
        const hashPassword: string = await bcrypt.hash(password, 5);
        //
        const createdUserDB: IUserDB = await UserModel.create(
            new User({ ...user, password: hashPassword }),
        );

        const newUser: IUserDto = new UserDto(createdUserDB);
        const tokens: IGenerateTokens = TokenService.generateToken({
            ...newUser,
        });
        await TokenService.saveRefreshTokenDB(createdUserDB._id, tokens.refreshToken);
        return {
            tokens,
            user: newUser,
        };
    }

    async login(userData: IRequestLoginUser): Promise<IResponseAuth> {
        const { login, password: passwordData } = userData;
        //
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
        await TokenService.saveRefreshTokenDB(user._id, tokens.refreshToken);
        return {
            tokens,
            user: userDto,
        };
    }

    async refresh(refreshToken: string): Promise<IResponseAuth> {
        if (refreshToken === null || refreshToken === undefined) {
            throw ApiError.Unauthorized();
        }
        const userTokenDto = tokenService.correctRefreshToken(refreshToken);
        const tokenDB: ITokenDB | null =
            await tokenService.findRefreshTokenDB(refreshToken);
        if (
            userTokenDto == null ||
            tokenDB == null ||
            typeof userTokenDto === "string" ||
            !("id" in userTokenDto)
        ) {
            throw ApiError.Unauthorized();
        }
        //
        const userDB: IUserDB | null = await UserModel.findById(
            userTokenDto.id,
        );
        if (userDB == null) {
            throw ApiError.Unauthorized();
        }
        const responseAuth: IResponseAuth =
            await AuthService.tokenUserLogic(userDB);
        return responseAuth;
    }

    private static async tokenUserLogic(user: IUserDB): Promise<IResponseAuth> {
        const userDto: UserDto = new UserDto(user);
        const tokens: IGenerateTokens = TokenService.generateToken({
            ...userDto,
        });
        await TokenService.saveRefreshTokenDB(user._id, tokens.refreshToken);
        return {
            tokens,
            user: userDto,
        };
    }
}

export default new AuthService();
