import { type IPostDB } from "../../dal/mongoDB/schemas/posts";
import { type Types } from "mongoose";
import type IPost from "../../dal/models/interfaces/IPost";

type IResponsePost = IPost & { id: Types.ObjectId };

export default IResponsePost;
