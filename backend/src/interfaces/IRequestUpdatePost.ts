import type IPost from "../dal/models/interfaces/IPost";

type IRequestUpdatePost = Omit<IPost, "createAt" | "ownerID"> & { id: string };

export default IRequestUpdatePost;
