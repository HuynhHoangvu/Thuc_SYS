/**
 * Wraps an async route handler to forward any unhandled rejection to the
 * global error handler instead of leaving the request hanging.
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
