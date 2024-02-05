import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import type IUser from "../dal/models/interfaces/IUser";

class UserService {
    async findUserDBByFilter(...filters: object[]): Promise<IUserDB | null> {
        const userDB: IUserDB | null = await UserModel.findOne({
            $or: filters,
        });
        return userDB;
    }

    async findUserDBByID(id: any): Promise<IUserDB | null> {
        return await UserModel.findById(id);
    }

    async createUserDB(user: IUser): Promise<IUserDB> {
        return await UserModel.create(user);
    }
}

export default new UserService();
