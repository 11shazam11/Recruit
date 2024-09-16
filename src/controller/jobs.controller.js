import {
  getjobDetails,
  deletemarked,
  updatemarked,
} from "../models/addjob.model.js";
import { addApplicant } from "../models/applyjob.model.js";

// Controller function to load job details
export const loadDetails = (req, res) => {
  let companyName = req.query.company;
  req.session.company = companyName;
  let data = getjobDetails(companyName);
  data = [data];
  // Render the 'jobdetails' view with job data, current user session, and no errors or modals
  res.render("jobdetails", {
    jobs: data,
    user: req.session.user,
    company: req.session.company,
    modal: null,
    error: null,
  });
};

// Controller function to add a resume/application
export const addresume = (req, res) => {
  console.log(req.body);
  let { company, name, email, contact } = req.body;
  let resume = req.file.filename;
  addApplicant(name, email, contact, resume, company);
  res.redirect("/seekjobs");
};

// Controller function to delete a job
export const deletejob = (req, res) => {
  let company = req.query.company;
  deletemarked(company);
  res.redirect("/jobs");
};

// Controller function to load the job update page
export const makechanges = (req, res) => {
  let company = req.query.company;
  let data = getjobDetails(company);
  req.session.style = "addjob";
  // Render the 'updatejob' view with job data, current user session, and no errors
  res.render("updatejob", {
    company: data,
    user: req.session.user,
    style: req.session.style,
    error: null,
  });
};

// Controller function to update a job
export const updatejob = (req, res) => {
  let company = req.session.company;
  let data = getjobDetails(company);

  if (req.validationErrors) {
    // If there are validation errors, re-render the 'updatejob' view with errors
    res.render("updatejob", {
      company: data,
      user: req.session.user,
      style: req.session.style,
      error: req.validationErrors,
    });
  } else {
    // If no errors, update the job with the provided data and redirect to the jobs page
    updatemarked(req.body);
    res.redirect("/jobs");
  }
};
