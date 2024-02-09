import { Types } from "mongoose";

interface IComment {
    ownerID: Types.ObjectId;
    postID: Types.ObjectId;
    text: string;
    createAt: string;
    isUpdated: boolean;
}

export default IComment;
