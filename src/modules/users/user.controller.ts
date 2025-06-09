
import { Request, Response } from "express";
import { handleCatch, handleSuccess } from "../../common/error-handlers";
import { UserService } from "./user.service";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const response = await UserService.signup(req.body);
      handleSuccess(res, response);
    } catch (error) {
      handleCatch(res, error);
    }
  }

   static async login(req: Request, res: Response) {
    try {
      const response = await UserService.login(req.body);
      handleSuccess(res, response);
    } catch (error) {
      handleCatch(res, error);
    }
  }
}