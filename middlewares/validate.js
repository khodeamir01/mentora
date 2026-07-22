const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        console.log(error);
        const errors = error.inner.map(e => e.message);
        return res.json({ success: false, error: errors[0] });
    }
};

module.exports = validate;