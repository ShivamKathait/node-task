import { Schema, Types, model } from 'mongoose';
import IBooks from '../interfaces/books.interface';
import { Genre } from '../common/app_constant';

const schema = new Schema<IBooks>({
    user_id: { type: Types.ObjectId, default: null, ref: "users" },
    author: { type: String, default: null },
    title: { type: String, default: null },
    genre: { type: String, default: Genre.FANTASY, enum: Object.values(Genre) },
    isbn: { type: String, default: null },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: null },
});

// Index for search functionality
schema.index({ title: 'text', author: 'text' });
schema.index({ genre: 1 });
schema.index({ author: 1 });

const BooksModel = model<IBooks>('books', schema);
export default BooksModel