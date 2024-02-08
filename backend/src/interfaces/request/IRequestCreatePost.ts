import type IPost from "../../dal/models/interfaces/IPost";

type IRequestCreatePost = Omit<IPost, "createAt" | "ownerID">;

export default IRequestCreatePost;
