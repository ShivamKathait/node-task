import express from 'express';
import passport from '../../middlewares/passport.strategy';
import { BooksController } from './books.controller';
import * as validator from './books.validation';

const router = express.Router();

router.post("/", [passport.authenticate('jwt', { session: false }), validator.addBook], BooksController.addBook);
router.get("/", [passport.authenticate('jwt', { session: false }), validator.listing], BooksController.listing);
router.get("/:id", [passport.authenticate('jwt', { session: false }), validator.details], BooksController.details);

// Reviews
router.post("/:id/reviews", [passport.authenticate('jwt', { session: false }), validator.reviews], BooksController.review);

//review id
router.put("/reviews/:id", [passport.authenticate('jwt', { session: false }), validator.updateReviews], BooksController.updateReview);
//review id
router.delete("/reviews/:id", [passport.authenticate('jwt', { session: false }), validator.deleteReviews], BooksController.deleteReview);

// searching books
router.get("/search", [passport.authenticate('jwt', { session: false }), validator.search], BooksController.search);

export default router;
 