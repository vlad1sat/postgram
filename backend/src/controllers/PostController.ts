import { type NextFunction, type Request, type Response } from "express";
import type IRequestUserAuth from "../interfaces/request/IRequestUserAuth";
import PostService from "../servises/PostService";
import type IRequestCreatePost from "../interfaces/request/IRequestCreatePost";
import type IResponsePost from "../interfaces/response/IResponsePost";
import type IRequestUpdatePost from "../interfaces/request/IRequestUpdatePost";
import UserDto from "../utils/token/UserDto/UserDto";
import type IResponseComment from "../interfaces/response/IResponseComment";

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
        req: Request<{ id: string }>,
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
        req: IRequestUserAuth<IRequestCreatePost>,
        res: Response<IResponsePost>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = UserDto.haveUserData(req);
            const dataUser: IRequestCreatePost = req.body;

            const post: IResponsePost = await PostService.createPost(
                id,
                dataUser,
            );
            res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }

    async deletePost(
        req: IRequestUserAuth<{}, { id: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = req.params;
            const { id: userID } = UserDto.haveUserData(req);
            await PostService.deletePostByID(id, userID);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async updatePost(
        req: IRequestUserAuth<IRequestUpdatePost>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { id } = UserDto.haveUserData(req);
            await PostService.updatePost(req.body, id);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();
