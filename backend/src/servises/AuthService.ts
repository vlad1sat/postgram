import type IRequestUser from "../interfaces/IRequestUser";
import UserModel from "../dal/mongoDB/schemas/users";
import bcrypt from "bcrypt";
import User from "../dal/models/User";
import ApiError from "../utils/logicErrors/ApiError";

class AuthService {
    async registration(user: IRequestUser): Promise<void> {
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
        const createdUserDB = await UserModel.create(
            new User({ ...user, password: hashPassword }),
        );
    }

    login() {}

    refresh() {}
}

export default new AuthService();
