import type IRequestCreatePost from "../interfaces/IRequestCreatePost";
import Post from "../dal/models/Post";
import PostsModel, { type IPostDB } from "../dal/mongoDB/schemas/posts";
import UserModel, { type IUserDB } from "../dal/mongoDB/schemas/users";
import type IResponsePost from "../interfaces/response/IResponsePost";
import ApiError from "../utils/logicErrors/ApiError";
import { type Types } from "mongoose";
import type IRequestUpdatePost from "../interfaces/IRequestUpdatePost";
import { correctIDDB } from "../utils/correctIDDB";

class PostService {
    async createPost(
        userID: string,
        dataPost: IRequestCreatePost,
    ): Promise<IResponsePost> {
        const postClass = new Post(dataPost, userID);
        const postDB: IPostDB = await PostsModel.create(postClass.objPost());
        const userDB: IUserDB | null = await UserModel.findById(userID);
        if (userDB === null) {
            throw Error("Ошибка добавления данных поста.");
        }

        userDB.posts.push(postDB._id);
        await userDB.save();
        return PostService.responsePostByDB(postDB);
    }

    async getPosts(): Promise<IResponsePost[]> {
        const posts: IPostDB[] = await PostsModel.find();
        return posts.map((postDB: IPostDB): IResponsePost => {
            return PostService.responsePostByDB(postDB);
        });
    }

    async getPostByID(id: string): Promise<IResponsePost> {
        const postDB: IPostDB = await PostService.findPostDBByID(id);
        return PostService.responsePostByDB(postDB);
    }

    async updatePost(
        requestPost: IRequestUpdatePost,
        userID: string,
    ): Promise<void> {
        const post: IPostDB = await PostService.correctLogicFindPost(
            requestPost.id,
            userID,
        );
        const { name, description } = requestPost;
        await post.updateOne({ name, description });
    }

    async deletePostByID(id: string, userID: string): Promise<void> {
        const post: IPostDB = await PostService.correctLogicFindPost(
            id,
            userID,
        );
        await post.deleteOne();
    }

    private static async findPostDBByID(id: string): Promise<IPostDB> {
        const idPost: Types.ObjectId = correctIDDB(id);
        const post: IPostDB | null = await PostsModel.findById(idPost);
        if (post === null) {
            throw ApiError.NotFound();
        }
        return post;
    }

    private static responsePostByDB(postDB: IPostDB): IResponsePost {
        const { name, description, ownerID, createAt, images, _id } = postDB;
        return {
            id: _id,
            name,
            description,
            createAt,
            ownerID,
            images,
        };
    }

    private static async correctLogicFindPost(
        id: string,
        userID: string,
    ): Promise<IPostDB> {
        const post: IPostDB = await this.findPostDBByID(id);

        if (String(post.ownerID) !== userID) {
            throw ApiError.Forbidden();
        }
        return post;
    }
}

export default new PostService();
