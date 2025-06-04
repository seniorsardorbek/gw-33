import { HttpException, HttpStatus } from '@nestjs/common';

export function ErrorHandler(error: Error, status?: HttpStatus) {
    if (!(error instanceof HttpException)) {
        error = new HttpException(
            error.message || 'Something went wrong, please try again later!',
            status || HttpStatus.BAD_REQUEST,
        );
    }
    throw error;
}