
import { Request, Response } from "express";
import { handleCatch, handleCustomError, handleSuccess } from "../../common/error-handlers";
import { BookService } from "./books.service";

export class BooksController {
    static async addBook(req: Request, res: Response) {
        try {
            const user = req.user!;
            const response = await BookService.addBook(user, req.body);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async listing(req: Request, res: Response) {
        try {
            const response = await BookService.listing(req.query);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async details(req: Request, res: Response) {
        try {
            const response = await BookService.details(req.params.id,req.query);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async search(req: Request, res: Response) {
        try {
            const response = await BookService.search(req.query);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async review(req: Request, res: Response) {
        try {
            const user = req.user!;
            const response = await BookService.review(user, req.params.id, req.body);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async updateReview(req: Request, res: Response) {
        try {
            const user = req.user!;
            const response = await BookService.updateReview(user, req.params.id, req.body);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }

    static async deleteReview(req: Request, res: Response) {
        try {
            const user = req.user!;
            const response = await BookService.deleteReview(user, req.params.id);
            handleSuccess(res, response);
        } catch (error) {
            handleCatch(res, error);
        }
    }
}