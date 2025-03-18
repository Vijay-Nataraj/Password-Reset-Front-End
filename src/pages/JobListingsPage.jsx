import React, { useState, useEffect } from "react";
import jobServices from "../services/jobServices";
import { Link } from "react-router-dom";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobServices.getAllJobs();
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Job Listings
        </h2>
        <div className="mb-6 text-center">
          <Link to="/user/client-dashboard/create-job">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Create New Job
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {jobs.map((job, index) => (
            <div
              key={job.id || index}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:bg-gradient-to-r from-[#bebdbd] to-[#8e8d8d]  hover:decoration-blue-500 transition duration-300 ease-out"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <p className="text-gray-500 mb-2">
                <span className="font-medium">Budget:</span> ${job.budget}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Deadline:</span> {job.deadline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
