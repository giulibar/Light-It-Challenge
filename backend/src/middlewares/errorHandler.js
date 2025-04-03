const errorHandler = (err, req, res, next) => {
    if (err.message === "Type of file not allowed") {
        return res.status(400).json({ error: err.message });
    }

    if (err.message === "Email already in use") {
        return res.status(400).json({ error: err.message });
    }

    if (err.message === "Error creating patient") {
        return res.status(500).json({ error: err.message });
    }

    if (err.message === "Validation error") {
        return res.status(500).json({
            error: err.message,
            details: err.field || "Invalid data"
        });
    }

    return res.status(500).json({
        error: "Internal server error",
        details: err.message || "Something went wrong"
    });
};

module.exports = errorHandler;
