import { getjobDetails } from "./addjob.model.js";

// Initializing an array to store applicants' details
const applicants = [];

// Function to add a new applicant to the applicants array
export const addApplicant = (name, email, contact, resume, company) => {
  let data = {
    name: name,
    email: email,
    contact: contact,
    resume: resume,
    company: company,
  };

  // Retrieving the job details for the specified company
  let appliedc = getjobDetails(company);
  appliedc.applied++;
  applicants.push(data);
};

// Function to retrieve all applicants from the applicants array
export const getApplicants = () => {
  return applicants;
};

// Function to get all applicants who applied to a specific company
export const appliedApllicants = (cname) => {
  let data = applicants.filter((applicant) => applicant.company === cname);
  console.log(data);
  return data;
};
