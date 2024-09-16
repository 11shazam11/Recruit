import express from "express";
import ejs from "ejs";
import expresslayout from "express-ejs-layouts";
import {
  loadhome,
  loadjobs,
  loadRegister,
  registerUser,
  loginuser,
  addjob,
  logjob,
  logoutuser,
} from "./src/controller/home.controller.js";
import {
  loadDetails,
  addresume,
  deletejob,
  makechanges,
  updatejob,
} from "./src/controller/jobs.controller.js";
import { uploadfile } from "./src/middlewares/fileupload.js";
import { sendConfirmation } from "./src/middlewares/sendmail.js";
import { checklogin } from "./src/validation/checklogin.validation.js";
import { appliedapplicants } from "./src/controller/applicant.controller.js";
import { validateRegister } from "./src/validation/login.validation.js";
import { validateAddjob } from "./src/validation/addjob.validation.js";
import { validateApply } from "./src/validation/apply.validation.js";
import session from "express-session";

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set the directory where the views (EJS templates) are located
app.set("views", "./src/views");

// Use express-ejs-layouts for layout support
app.use(expresslayout);

// Middleware for parsing URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// Setting up session management
app.use(
  session({
    secret: "secret",        
    resave: false,            
    saveUninitialized: false,  
    cookie: { secure: false }, 
  }),
);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to load the home page
app.get("/", loadhome);

// Route to load the jobs page (requires user to be logged in)
app.get("/jobs", checklogin, loadjobs);

// Route to load jobs for seekers (no login required)
app.get("/seekjobs", loadjobs);

// Route to load the registration page
app.get("/register", loadRegister);

// Route to handle user registration (with validation)
app.post("/register", validateRegister, registerUser);

// Route to handle user login
app.post("/login", loginuser);

// Route to handle user logout
app.get("/logout", logoutuser);

// Route to load the "Add Job" page
app.get("/addjob", addjob);

// Route to handle adding a job (with validation)
app.post("/add", validateAddjob, logjob);

// Route to load job details
app.get("/viewdetails", loadDetails);

// Route to handle job applications (with file upload, validation, and email confirmation)
app.post(
  "/applyjob",
  uploadfile.single("resume"), 
  validateApply,              
  sendConfirmation,            
  addresume,                   
);

// Route to view the list of applicants for a job
app.get("/appliedApplicants", appliedapplicants);

// Route to delete a job
app.get("/delete", deletejob);

// Route to load the job update page
app.get("/update", makechanges);

// Route to handle updating a job (with validation)
app.post("/updatejob", validateAddjob, updatejob);

// Start the Express.js server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
