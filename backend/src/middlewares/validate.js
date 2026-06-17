/**
 * Validates the request body against a Zod schema.
 * Returns 400 with a field-level error list on failure,
 * otherwise replaces req.body with the parsed (typed) data.
 */
export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map(e => ({
                field: e.path.join("."),
                message: e.message
            }));
            res.status(400).json({ error: "Dữ liệu không hợp lệ", details: errors });
            return;
        }
        req.body = result.data;
        next();
    };
};
