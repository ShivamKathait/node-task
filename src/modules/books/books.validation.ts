import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { handleCatch, handleJoiError, handleCustomError } from "../../common/error-handlers";
import { Types } from "mongoose";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      author: Joi.string().max(50).required().messages({
        "any.required": "Author is required.",
      }),
      title: Joi.string().max(50).required().messages({
        "any.required": "Title is required.",
      }),
      genre: Joi.string().max(50).required().messages({
        "any.required": "Genre is required.",
      }),
      isbn: Joi.string().max(13).required().messages({
        "any.required": "Isbn is required.",
      }),
    })

    let { error } = schema.validate(req.body);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const listing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      page: Joi.string().max(50).optional(),
      limit: Joi.string().max(50).optional(),
      author: Joi.string().max(50).optional(),
      genre: Joi.string().max(50).optional(),
    })

    let { error } = schema.validate(req.query);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const details = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || !Types.ObjectId.isValid(id)) {
      handleCustomError("invalid_book_id")
    }
     let schema: any = Joi.object({
      page: Joi.string().max(50).optional(),
      limit: Joi.string().max(50).optional(),
    })

    let { error } = schema.validate(req.query);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const reviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      rating: Joi.number().max(5).required(),
      comment: Joi.string().max(50).required(),
    })

    let { error } = schema.validate(req.body);
    if (error) throw handleJoiError(error);
    const id = req.params.id;
    if (!id || !Types.ObjectId.isValid(id)) {
      handleCustomError("invalid_book_id")
    }
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const updateReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      rating: Joi.number().max(5).optional(),
      comment: Joi.string().max(50).optional(),
    })

    let { error } = schema.validate(req.body);
    if (error) throw handleJoiError(error);
    const id = req.params.id;
    if (!id || !Types.ObjectId.isValid(id)) {
      handleCustomError("invalid_book_id")
    }
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const deleteReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || !Types.ObjectId.isValid(id)) {
      handleCustomError("invalid_review_id")
    }
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      search: Joi.string().max(50).optional(),
      page: Joi.string().max(50).optional(),
      limit: Joi.string().max(50).optional(),
    })

    let { error } = schema.validate(req.query);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

export {
  addBook,
  listing,
  reviews,
  updateReviews,
  deleteReviews,
  search,
  details
}