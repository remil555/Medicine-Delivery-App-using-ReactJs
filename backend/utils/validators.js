import { body } from "express-validator";

export const signupValidationRules = () => {
    return [
        body("fullname").notEmpty().withMessage("Fullname is required"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        body("confirmPassword").notEmpty().withMessage("Confirm Password is required"),
        body("address").notEmpty().withMessage("Address is required"),
    ];
};

export const loginValidationRules = () => {
    return [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ];
};
