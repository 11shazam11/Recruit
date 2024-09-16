import { body, validationResult } from "express-validator";
import { getjobDetails } from "../models/addjob.model.js";
export const validateApply = async (req, res, next) => {
    console.log(req.body.name);
    const rules = [
        body("name").notEmpty().withMessage("Enter your name"),
        body("email").isEmail().withMessage("Invalid Email"),
        body("contact")
            .isNumeric()
            .withMessage("Enter number")
            .isLength({ min: 10, max: 10 })
            .withMessage("Contact must be 10 digit number"),
        body('resume').custom((value,{req}) => {
            if(!req.file){
                throw new Error('Resume is required')
            }
            return true;
        })
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    let vE = validationResult(req);

    if (!vE.isEmpty()) {
        let company = req.session.company;
        let data = getjobDetails(company);
        data = [data];
        res.render("jobdetails", {
            jobs: data,
            user: req.session.user,
            company: req.session.company,
            modal: true,
            error: vE.array(),
        });
    } else {
        next();
    }
};
