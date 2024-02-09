import type IRequestCreatePost from "./IRequestCreatePost";

type IRequestUpdatePost = IRequestCreatePost & { id: string };

export default IRequestUpdatePost;
