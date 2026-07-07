/**
 * Error handling utilities
 */

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class BlockchainError extends AppError {
  constructor(message: string, details?: any) {
    super('BLOCKCHAIN_ERROR', message, 500, details);
    this.name = 'BlockchainError';
  }
}

/**
 * Handle error and return user-friendly message
 */
export function handleError(error: any): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Handle specific error messages
    if (error.message.includes('not found')) {
      return 'Resource not found';
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again';
    }
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Log error with context
 */
export function logError(error: any, context?: Record<string, any>) {
  console.error('Error:', error);
  if (context) {
    console.error('Context:', context);
  }
}
