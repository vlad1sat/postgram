import { type Types } from "mongoose";
import type IPost from "../../dal/models/interfaces/IPost";

type IResponsePost = Omit<IPost, "comments"> & { id: Types.ObjectId };

export default IResponsePost;
