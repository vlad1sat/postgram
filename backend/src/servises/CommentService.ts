import CommentModel, { type ICommentDB } from "../dal/mongoDB/schemas/comments";
import ApiError from "../utils/logicErrors/ApiError";
import type IResponseComment from "../interfaces/response/IResponseComment";
import type IRequestCreateComment from "../interfaces/request/IRequestCreateComment";
import PostService from "./PostService";
import Comment from "../dal/models/Comment";
import { type Types } from "mongoose";
import { correctIDDB } from "../utils/correctIDDB";
import { type IPostDB } from "../dal/mongoDB/schemas/posts";
import type IRequestUpdatePost from "../interfaces/request/IRequestUpdatePost";
import type IRequestUpdateComment from "../interfaces/request/IRequestUpdateComment";

class CommentService {
    async getCommentByID(id: string): Promise<IResponseComment> {
        const commentDB: ICommentDB | null = await CommentModel.findById(id);
        if (commentDB == null) {
            throw ApiError.NotFound();
        }
        return this.responseCommentByDB(commentDB);
    }

    async createComment(
        userID: string,
        dataComment: IRequestCreateComment,
    ): Promise<IResponseComment> {
        const postDB: IPostDB = await PostService.findPostDBByID(
            dataComment.postID,
        );

        const comment = new Comment(dataComment, userID);
        const commentDB: ICommentDB = await CommentModel.create(
            comment.objComment(),
        );

        postDB.comments.push(commentDB._id);
        await postDB.save();
        return this.responseCommentByDB(commentDB);
    }

    async deleteComment(userID: string, commentID: string): Promise<void> {
        const commentDB: ICommentDB = await this.findCommentDBByID(commentID);
        const postDB: IPostDB = await PostService.findPostDBByID(
            String(commentDB.postID),
        );

        if (
            String(postDB.ownerID) !== userID &&
            String(commentDB.ownerID) !== userID
        ) {
            throw ApiError.Forbidden();
        }

        await commentDB.deleteOne();

        postDB.comments = postDB.comments.filter(
            (comment: Types.ObjectId) => String(comment) !== commentID,
        );
        await postDB.save();
    }

    async updateComment(
        userID: string,
        dataComment: IRequestUpdateComment,
    ): Promise<void> {
        const commentDB: ICommentDB = await this.findCommentDBByID(
            String(dataComment.id),
        );
        if (String(commentDB.ownerID) !== userID) {
            throw ApiError.Forbidden();
        }

        const newComment = new Comment(dataComment, userID);
        await commentDB.updateOne(newComment.objComment());
    }

    public async findCommentDBByID(id: string): Promise<ICommentDB> {
        const idComment: Types.ObjectId = correctIDDB(id);
        const post: ICommentDB | null = await CommentModel.findById(idComment);

        if (post == null) {
            throw ApiError.NotFound();
        }
        return post;
    }

    public responseCommentByDB(commentDB: ICommentDB): IResponseComment {
        const { ownerID, createAt, _id, postID, isUpdated, text } = commentDB;
        return {
            id: _id,
            text,
            createAt,
            ownerID,
            postID,
            isUpdated,
        };
    }
}

export default new CommentService();
