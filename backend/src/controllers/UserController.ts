import { type Request, type Response, type NextFunction } from "express";
import type IResponseUser from "../interfaces/response/IResponseUser";
import UserService from "../servises/UserService";
import type IPost from "../dal/models/interfaces/IPost";

class UserController {
    async getUsers(
        req: Request,
        res: Response<IResponseUser[]>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const users: IResponseUser[] = await UserService.getUsers();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserByID(
        req: Request<{ id: string }>,
        res: Response<IResponseUser>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = req.params;
            const user: IResponseUser = await UserService.getUserByID(id);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async getUserPosts(
        req: Request<{ id: string }>,
        res: Response<IPost[]>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id: userID } = req.params;
            const postsUser: IPost[] = await UserService.getPostsUser(userID);
            res.status(200).json(postsUser);
        } catch (e) {
            next(e);
        }
    }
}
export default new UserController();
