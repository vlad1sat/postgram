import { model, Schema, type Document, type Types } from "mongoose";
import { userDBName } from "./users";
import type IPost from "../../models/interfaces/IPost";
import DateLogic from "../../../utils/DateLogic";

const PostsSchema = new Schema<IPost>({
    name: { type: "String", required: true },
    description: { type: "String", required: true },
    createAt: {
        type: "String",
        required: true,
        default: DateLogic.getDateNowToISO(),
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: () => userDBName,
        required: true,
    },
    images: [
        {
            type: "String",
            required: true,
        },
    ],
});

export const postsDBName: string = "posts";

const PostsModel = model<IPost>(postsDBName, PostsSchema);

export type IPostDB = Document<unknown, {}, IPost> &
    IPost & { _id: Types.ObjectId };
export default PostsModel;
