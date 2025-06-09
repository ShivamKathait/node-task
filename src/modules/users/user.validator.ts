import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { handleCatch, handleJoiError } from "../../common/error-handlers";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter valid email address.",
        "any.required": "Email is required.",
      }),
      password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters.",
        "any.required": "Password is required.",
      }),
       full_name: Joi.string().max(50).required().messages({
        "any.required": "full name is required.",
      }),
    })

    let { error } = schema.validate(req.body);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let schema: any = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter valid email address.",
        "any.required": "Email is required.",
      }),
      password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters.",
        "any.required": "Password is required.",
      })
    })

    let { error } = schema.validate(req.body);
    if (error) throw handleJoiError(error);
    next();
  } catch (err) {
    handleCatch(res, err);
  }
};

export {
  signup,
  login
}