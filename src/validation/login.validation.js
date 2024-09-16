import { body, validationResult } from "express-validator";

export const validateRegister = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Enter your name"),
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be more than 5 char"),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.render("register", { error: validationErrors.array() });
    } else {
        next();
    }
};
