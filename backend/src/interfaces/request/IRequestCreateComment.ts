import type IComment from "../../dal/models/interfaces/IComment";

type IRequestCreateComment = Omit<
    IComment,
    "createAt" | "isUpdated" | "ownerID" | "postID"
> & { postID: string };

export default IRequestCreateComment;
