import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import type IResponseUser from "../interfaces/response/IResponseUser";
import ApiError from "../utils/logicErrors/ApiError";
import { type IPostDB, postsDBName } from "../dal/mongoDB/schemas/posts";
import PostService from "./PostService";
import type IResponsePost from "../interfaces/response/IResponsePost";

class UserService {
    async getUsers(): Promise<IResponseUser[]> {
        const usersDB: IUserDB[] = await UserModel.find();
        return usersDB.map(this.responseUser);
    }

    async getUserByID(id: string): Promise<IResponseUser> {
        const userDB: IUserDB | null = await UserModel.findById(id);
        if (userDB == null) {
            throw ApiError.BadRequest("Пользователь с таким id не найден.");
        }
        return this.responseUser(userDB);
    }

    async getPostsUser(userID: string): Promise<IResponsePost[]> {
        const userDB: IUserDB | null = await UserModel.findById(userID);
        if (userDB == null) {
            throw ApiError.BadRequest("Пользователь с таким id не найден.");
        }

        const { posts } = await userDB.populate<{ posts: IPostDB[] }>(
            postsDBName,
        );
        return posts.map(PostService.responsePostByDB);
    }

    public responseUser(userDB: IUserDB): IResponseUser {
        const { username, email, createAt, _id } = userDB;
        return {
            id: String(_id),
            username,
            email,
            createAt,
        };
    }
}

export default new UserService();
