import { Types } from "mongoose";

interface IUsers {
    _id?: Types.ObjectId;
    email: string;
    password?: string;
    full_name: string;
    created_at?: Date;
    updated_at?: Date;
    access_token?: string;
}

interface IUserDocument extends Document, IUsers {
    password: string; // make required for document usage
    isModified(path: string): boolean;
}

interface IUserResponse {
    _id?: Types.ObjectId;
    email?: string;
    full_name?: string;
    created_at?: Date;
    updated_at?: Date;
}

interface ILoginDto {
    email: string;
    password: string;
}

interface ISignupDTO {
    email: string;
    password: string;
    full_name: string;
}

interface IAuthResponse {
    message: string;
    token: string;
    user: IUserResponse;
}

export {
IUsers,
IAuthResponse,
ISignupDTO,
ILoginDto,
IUserDocument,
IUserResponse
}