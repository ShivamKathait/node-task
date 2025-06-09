import express from 'express';
import passport from 'passport';
import { UserController } from './user.controller';
import * as validator from './user.validator';

const router = express.Router();

router.post("/signup", [validator.signup], UserController.signup);
router.post("/login", [validator.login], UserController.login);

export default router;
