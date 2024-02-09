import { Schema, model, type Document, type Types } from "mongoose";
import type IComment from "../../models/interfaces/IComment";
import DateLogic from "../../../utils/DateLogic";
import { userDBName } from "./users";
import { postsDBName } from "./posts";

const commentsSchema = new Schema<IComment>({
    ownerID: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: () => userDBName,
    },
    text: { required: true, type: "String" },
    createAt: {
        required: true,
        type: "String",
        default: DateLogic.getDateNowToISO(),
    },
    isUpdated: { required: true, type: "Boolean", default: false },
    postID: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: () => postsDBName,
    },
});

export const commentsNameDB: string = "comments";

const CommentModel = model<IComment>(commentsNameDB, commentsSchema);
export type ICommentDB = Document<unknown, {}, IComment> &
    IComment & { _id: Types.ObjectId };
export default CommentModel;
