import { Types } from "mongoose";

export default interface IReview {
    _id?: Types.ObjectId;
    book_id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    rating?: number;
    comment?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface ReviewDto {
    book_id: string;
    rating: number;
    comment: string;
}

export interface IUpdateReviewRequest {
    rating?: number;
    comment?: string;
}