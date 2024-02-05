import { type NextFunction, type Request, type Response } from "express";
import type RequestUserAuth from "../interfaces/RequestUserAuth";
import ApiError from "../utils/logicErrors/ApiError";
import PostService from "../servises/PostService";
import type IRequestCreatePost from "../interfaces/IRequestCreatePost";
import { type IPostDB } from "../dal/mongoDB/schemas/posts";
import {
    type Result,
    type ValidationError,
    validationResult,
} from "express-validator";
import type IResponsePost from "../interfaces/response/IResponsePost";
import type IUserDto from "../utils/token/UserDto/IUserDto";
import type IRequestUpdatePost from "../interfaces/IRequestUpdatePost";
import UserDto from "../utils/token/UserDto/UserDto";
import IResponseAuth from "../interfaces/response/IResponseAuth";

class PostController {
    async getAllPosts(
        req: Request,
        res: Response<IResponsePost[]>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const posts: IResponsePost[] = await PostService.getPosts();
            res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }

    async getPostByID(
        req: RequestUserAuth<{}, { id: string }>,
        res: Response<IResponsePost>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = req.params;
            const post: IResponsePost = await PostService.getPostByID(id);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    async createPost(
        req: RequestUserAuth<IRequestCreatePost>,
        res: Response<IResponsePost>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const user: IUserDto = UserDto.haveUserData(req);
            const dataUser: IRequestCreatePost = req.body;

            const result: IResponsePost = await PostService.createPost(
                user.id,
                dataUser,
            );
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    async deletePost(
        req: RequestUserAuth<{}, { id: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = req.params;
            const user: IUserDto = UserDto.haveUserData(req);
            await PostService.deletePostByID(id, user.id);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async updatePost(
        req: RequestUserAuth<IRequestUpdatePost>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const user: IUserDto = UserDto.haveUserData(req);
            await PostService.updatePost(req.body, user.id);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();
