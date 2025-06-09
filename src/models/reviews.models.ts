import { Schema, Types, model } from 'mongoose';
import IReview from '../interfaces/review.interface';

const schema = new Schema<IReview>({
    user_id: { type: Types.ObjectId, default: null, ref: "users" },
    book_id: { type: Types.ObjectId, default: null, ref: "books" },
    rating: { type: Number, default: null },
    comment: { type: String, default: null },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: null },
});

// Compound index to ensure one review per user per book
schema.index({ book: 1, user: 1 });

const ReviewsModel = model<IReview>('reviews', schema);
export default ReviewsModel