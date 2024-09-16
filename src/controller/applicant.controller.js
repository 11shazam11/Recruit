import { appliedApllicants } from "../models/applyjob.model.js";

// Controller function to handle the route for viewing all applicants for a specific job
export const appliedapplicants = (req, res) => {
  // Extract the company name from the query parameters in the URL
  let companyname = req.query.company;

  let found = appliedApllicants(companyname);

  if (found) {
    res.render("allapplicants", {
      applicant: found, // Array of applicants found for the company
      user: req.session.user, // User data from the session
    });
  } else {
    // If no applicants are found, send an empty response (or handle this case appropriately)
    res.send();
  }
};
