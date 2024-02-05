import type IRequestUser from "../../../interfaces/IRequestUser";

interface IUserDto extends Omit<IRequestUser, "password"> {
    id: string;
}

export function instanceOfIUserDto(object: any): object is IUserDto {
    return "email" in object && "id" in object && "username" in object;
}

export default IUserDto;
