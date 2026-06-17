/** Mocked authorize middlewares for standalone mode - bypass all auth checks */
export const requireAuth = (req, res, next) => {
    next();
};
export const requireRole = (roles) => {
    return (req, res, next) => {
        next();
    };
};
export const requirePermission = (keys, mode = "any") => {
    return (req, res, next) => {
        next();
    };
};
export const requireHrWriteOrSelfAttendance = (req, res, next) => {
    next();
};
export const requireHrReadOrSelfAttendance = (req, res, next) => {
    next();
};
