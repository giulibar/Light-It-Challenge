const { body, validationResult } = require("express-validator");

const validatePatient = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("document").optional(),

  (req, res, next) => {
    if (!req.file) {
      return next({
        statusCode: 400,
        message: "Validation error",
        field: "Document is required",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return next({
        statusCode: 400,
        message: "Validation error",
        field: firstError.msg
      });
    }

    next();
  }
];

module.exports = validatePatient;
