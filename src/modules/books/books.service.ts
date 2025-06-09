import { setOptions } from "../../common/helper";
import { handleCustomError } from "../../common/error-handlers";
import IBooks, { IBookDetails, IBookSearch, IBooksQuery, Query } from "../../interfaces/books.interface";
import { IUserResponse } from "../../interfaces/users.interface";
import * as models from "../../models/index";
import { Genre, GenreMap } from "../../common/app_constant";
import { FilterQuery, Types } from "mongoose";
import { ReviewDto } from "../../interfaces/review.interface";
import { ReviewAggregation } from "./books.aggregation";

export class BookService {
    private static options = { lean: true, sort: { _id: -1 } }
    private static newOptions = { new: true, lean: true, sort: { _id: -1 } }

    static async addBook(user: IUserResponse, body: IBooks) {
        try {
            let { _id: user_id } = user;
            let { isbn } = body;
            let query = { isbn }
            let isBook = await models.Books.findOne(query, {}, this.options);

            // assumed that a book can be added once
            if (isBook) handleCustomError("book_already_exists");
            const genreValue = GenreMap[body.genre] || body.genre;

            let save_data = { user_id, ...body, genre: genreValue }
            let book = await models.Books.create(save_data);
            let result = { message: "Book saved successfully", data: book }
            return result
        } catch (error) {
            console.log("error", error);
            throw error
        }
    }

    static async listing(body: IBooksQuery) {
        try {
            const options = setOptions(body?.page, body?.limit);
            const query: FilterQuery<Document> = {};
            const orConditions = [];

            if (body?.author) {
                orConditions.push({ author: { $regex: body.author, $options: "i" } });
            }

            if (orConditions?.length) {
                query.$or = orConditions;
            }

            if (body?.genre && GenreMap[body.genre]) {
                query.genre = GenreMap[body.genre];
            }

            const count = await models.Books.countDocuments(query);
            const books = await models.Books.find(query, {}, options);

            return { count, data: books };
        } catch (error) {
            throw error;
        }
    }

    static async details(book_id: string, dto: IBookDetails) {
        try {
            let options = setOptions(dto?.page, dto?.limit);
            let bookId = new Types.ObjectId(book_id)
            let projection: Record<string, 0 | false> = { __v: 0, updated_at: 0 };
            let book_details = await models.Books.findById(bookId, projection, this.options);
            let query = [
                await ReviewAggregation.match(bookId),
                await ReviewAggregation.project_data(),
                await ReviewAggregation.facet_data(options.skip, options.limit),
                await ReviewAggregation.unwind_metadat(),
                await ReviewAggregation.final_data()
            ]
            let response = await models.Reviews.aggregate(query);
            let data = {
                ...book_details,
                avg_rating: response[0]?.avg_rating ?? 0,
                reviews: response[0]?.data ?? [],
            }
            return data
        } catch (error) {
            throw error
        }
    }

    static async search(data: IBookSearch) {
        try {
            const options = setOptions(data?.page, data?.limit);
            const query: FilterQuery<Document> = {};
            if (data?.search) {
                query.$or = [
                    { title: { $regex: data.search, $options: "i" } },
                    { author: { $regex: data.search, $options: "i" } }
                ];
            }
            let count = await models.Books.countDocuments(query);
            let books = await models.Books.find(query, {}, options);
            return { count, data: books }
        } catch (error) {
            throw error
        }
    }

    static async review(user: IUserResponse, book_id: string, body: ReviewDto) {
        try {
            let { _id: user_id } = user;
            let { rating, comment } = body;
            let bookId = new Types.ObjectId(book_id)
            let bookQuery = { _id: bookId, user_id }
            const book = await models.Books.findOne(bookQuery, {}, this.options);
            if (!book) handleCustomError("cannot_review_own_book");
            let query = { user_id, book_id: bookId }
            let isRating = await models.Reviews.findOne(query, {}, this.options);
            if (isRating) handleCustomError("rating_already_exists");
            let save_data = { user_id, book_id: bookId, rating, comment }
            let review = await models.Reviews.create(save_data);
            let result = { message: "Review saved successfully", data: review }
            return result
        } catch (error) {
            throw error
        }
    }

    static async updateReview(user: IUserResponse, review_id: string, body: ReviewDto) {
        try {
            let { _id: user_id } = user;
            let reviewId = new Types.ObjectId(review_id);
            let query = { user_id, _id: reviewId }
            let isReview = await models.Reviews.findOne(query, {}, this.options);
            if (!isReview) handleCustomError("cannot_find_review");
            const save_data: Partial<ReviewDto> = {};
            if (body.rating) save_data.rating = body.rating;
            if (body.comment) save_data.comment = body.comment;
            let review = await models.Reviews.findByIdAndUpdate(isReview?._id, save_data, this.newOptions);
            let result = { message: "Review updated successfully", data: review }
            return result
        } catch (error) {
            throw error
        }
    }

    static async deleteReview(user: IUserResponse, review_id: string) {
        try {
            let { _id: user_id } = user;
            let reviewId = new Types.ObjectId(review_id)
            let query = { user_id, _id: reviewId }
            let review = await models.Reviews.deleteOne(query);
            if (review.deletedCount > 0) {
                let result = { message: "Review removed successfully" }
                return result
            }
        } catch (error) {
            throw error
        }
    }
}