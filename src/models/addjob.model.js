// Initializing an array of jobs with a default job entry
const jobs = [
  {
    type: "Full-time",
    desig: "Software Engineer",
    company: "Google",
    location: "New York",
    positions: "10",
    applydate: "2023-01-01",
    salary: "10,000",
    skills: ["Java", "PHP"],
    applied: 0,
  },
];

// Function to insert a new job into the 'jobs' array
export const insertjob = (user) => {
  let { type, desig, company, location, positions, date, salary, skills } =
    user;

  // Ensure 'skills' is an array; if not, convert it to an array
  if (!Array.isArray(skills)) {
    skills = [skills];
  }

  // Create a new job object with the provided details
  let data = {
    type: type,
    desig: desig,
    company: company,
    location: location,
    positions: positions,
    applydate: date,
    salary: salary,
    skills: skills,
    applied: 0, // Initialize 'applied' count to 0
  };

  // Add the new job to the 'jobs' array
  jobs.push(data);
};

// Function to retrieve all jobs from the 'jobs' array
export const getall = () => {
  return jobs;
};

// Function to get the details of a specific job by company name
export const getjobDetails = (name) => {
  let data = jobs.find((job) => job.company === name);
  return data;
};

// Function to delete a job from the 'jobs' array based on company name
export const deletemarked = (name) => {
  let index = jobs.findIndex((job) => job.company === name);
  jobs.splice(index, 1);
};

// Function to update an existing job in the 'jobs' array
export const updatemarked = (data) => {
  let cname = data.companyname;
  let index = jobs.findIndex((job) => job.company === cname);

  // Destructure the updated job details from the provided data
  let { type, desig, company, location, positions, date, salary, skills } =
    data;

  // Ensure 'skills' is an array; if not, convert it to an array
  if (!Array.isArray(skills)) {
    skills = [skills];
  }

  // Create an updated job object with the new details
  let updateddata = {
    type: type,
    desig: desig,
    company: company,
    location: location,
    positions: positions,
    applydate: date,
    salary: salary,
    skills: skills,
  };

  // Replace the old job entry with the updated job details
  jobs[index] = updateddata;
};
