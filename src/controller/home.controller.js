import { Register } from "../models/recruiter.model.js";
import { insertjob, getall } from "../models/addjob.model.js";

// Controller function to load the home page
export const loadhome = (req, res) => {
  res.render("home", { er: false, reg: false });
};

// Controller function to load the jobs page
export const loadjobs = (req, res) => {
  let data = getall();
  res.render("jobs", { jobs: data, user: req.session.user });
};

// Controller function to load the registration page
export const loadRegister = (req, res) => {
  res.render("register", { error: null });
};

// Controller function to register a new user
export const registerUser = (req, res) => {
  Register.addUser(req.body);
  res.render("home", { er: false, reg: 1 });
};

// Controller function to log in a user
export const loginuser = (req, res) => {
  let { email } = req.body;

  let found = Register.checkuser(req.body);
  if (found) {
    req.session.user = email;
    res.redirect("/jobs");
  } else {
    res.render("home", { er: "Invalid Credentials", reg: false });
  }
};

// Controller function to log out a user
export const logoutuser = (req, res) => {
  // Destroy the session and redirect to the home page
  req.session.destroy();
  res.redirect("/");
};

// Controller function to load the add job page
export const addjob = (req, res) => {
  req.session.style = "addjob";
  res.render("addjob", { style: req.session.style, error: null });
};

// Controller function to log a job into the system
export const logjob = (req, res) => {
  if (req.validationErrors) {
    res.render("addjob", {
      style: req.session.style,
      error: req.validationErrors,
    });
  } else {
    insertjob(req.body);
    res.redirect("/jobs");
  }
};
