import { Genre } from "../common/app_constant";
import { Types } from "mongoose";

export default interface IBooks {
    _id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    author: string;
    title: string;
    genre: string;
    isbn: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface IBooksWithStats extends IBooks {
    averageRating: number;
    reviewCount: number;
}


export interface IBooksQuery {
    page?: string;
    limit?: string;
    author?: string;
    genre?: string;
}

export interface IBookDetails {
    page?: string;
    limit?: string;
}

export interface IBookSearch {
    search?: string;
    page?: string;
    limit?: string;
}

export interface Query {
    [key: string]: string | boolean | Types.ObjectId;
}
