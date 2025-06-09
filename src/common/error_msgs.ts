export const errorMap: Record<string, { status_code: number; custom_msg: string; type: string }> = {
  default_msg: {
    status_code: 400,
    custom_msg: 'Bad Request',
    type: 'default_msg',
  },
  no_data_found: {
    status_code: 400,
    custom_msg: 'No data found',
    type: 'no_data_found',
  },
  invalid_credentials: {
    status_code: 400,
    custom_msg: 'Invalid login details',
    type: 'invalid_credentials',
  },
  invalid_password: {
    status_code: 400,
    custom_msg: 'Incorrect email or password!.',
    type: 'invalid_password',
  },
  unauthorized: {
    status_code: 400,
    custom_msg: 'You are not authorized to perform this action.',
    type: 'unauthorized',
  },
  email_already_exists: {
    status_code: 400,
    custom_msg: 'This email address already exists. Please try again.',
    type: 'email_already_exists',
  },
  user_not_found: {
    status_code: 404,
    custom_msg: 'User does not exist. Please sign up.',
    type: 'user_not_found',
  },
  book_already_exists: {
    status_code: 400,
    custom_msg: 'A book with the same ISBN already exists.',
    type: 'book_already_exists',
  },
  rating_already_exists: {
    status_code: 400,
    custom_msg: 'You have already rated this book.',
    type: 'rating_already_exists',
  },
  cannot_review_own_book: {
    status_code: 403,
    custom_msg: 'You are not allowed to review your own book.',
    type: 'cannot_review_own_book',
  },
  cannot_find_review: {
    status_code: 404,
    custom_msg: 'Review not found.',
    type: 'cannot_find_review',
  },
  invalid_book_id: {
    status_code: 400,
    custom_msg: 'Book ID is required and must be a valid ObjectId.',
    type: 'invalid_book_id',
  },
  invalid_review_id: {
    status_code: 400,
    custom_msg: 'Review ID is required and must be a valid ObjectId.',
    type: 'invalid_review_id',
  },
  inavlid_token: {
    status_code: 400,
    custom_msg: 'Invalid token',
    type: 'inavlid_token',
  },
  something_went_wrong: {
    status_code: 400,
    custom_msg: 'Something went wrong',
    type: 'something_went_wrong',
  },
};
