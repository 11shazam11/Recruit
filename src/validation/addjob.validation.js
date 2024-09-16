import { body, validationResult } from "express-validator";

export const validateAddjob = async (req, res, next) => {
  const rules = [
    body("company").notEmpty().withMessage("Enter your company name"),
    body("location").notEmpty().withMessage("Please enter location"),
    body("positions")
      .isInt({ lt: 200 })
      .withMessage("Mention number of positions (<200)"),
    body('date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Please enter valid date').custom((value) => {
      let curr = new Date();
      let sel = new Date(value);
      if(sel<curr){
        throw new Error('Date invalid');
      }
    }),
    body("salary")
      .isAlphanumeric()
      .withMessage("Enter salary in 0-0lpa format"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    req.validationErrors = validationErrors.array();
  } else {
    req.vaidationErrors = null;
  }
  next();
};
