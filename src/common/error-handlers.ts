import { Response } from 'express';
import { ValidationError } from 'joi';
import { errorMap } from "./error_msgs";

// Define a custom error interface
interface CustomError {
  type?: string;
  status_code?: number;
  error_message?: string | object;
  message?: string;
}

// Success response handler
const handleSuccess = <T>(reply: Response, response: T): void => {
  reply.send(response);
};

// Catch error handler
const handleCatch = (reply: Response, error: unknown): void => {
  const err = error as CustomError;

  const type = err.type ?? 'Bad Request';
  const status_code = err.status_code ?? 400;
  const error_message = err.error_message ?? err.message ?? 'Something went wrong';

  reply.status(status_code).send({
    error: type,
    error_description: error_message,
  });
};

// Joi error handler
const handleJoiError = (error: ValidationError): never => {
  const error_message = error.details[0]?.message.replace(/"/g, '') ?? 'Validation error';
  throw {
    status_code: 400,
    type: 'Joi Error',
    error_message,
  };
};

const handleCustomError = (type: string) => {
  const error = errorMap[type] || errorMap['default_msg'];
  throw {
    status_code: error.status_code,
    type: error.type,
    error_message: error.custom_msg,
  };
};


export {
  handleCatch,
  handleSuccess,
  handleJoiError,
  handleCustomError
};
