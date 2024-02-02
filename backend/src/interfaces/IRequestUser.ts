import type IUser from "../dal/models/interfaces/IUser";

type IRequestUser = Omit<IUser, "createAt">;

export default IRequestUser;
