import React, { useEffect, useState } from "react";
import jobServices from "../services/jobServices";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobServices.getAvailableJobs();
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const sendProposal = async (jobId) => {
    const proposalData = {
      jobId,
      freelancerId: "freelancerId", // Replace with actual freelancer ID
      description: "I am interested in this job and would love to work on it.",
      budget: "500", // Replace with freelancer's proposed budget
    };

    try {
      await jobServices.createProposal(proposalData); // Call API to create a proposal
      alert("Proposal sent successfully!");
    } catch (err) {
      alert("Error sending proposal: " + err.message);
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-700">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Latest Jobs
      </h2>
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={job.id || index}
            className="border border-gray-200 p-6 rounded-lg shadow-md bg-white hover:text-white hover:bg-gradient-to-r to-[#f7f8f8] from-[#6d6d6d] hover:decoration-blue-500 transition duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-800 mb-2">{job.description}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-green-600">{`${job.budget}`}</span>
              <span className="text-sm text-gray-500">{job.category}</span>
            </div>
            <button
              onClick={() => sendProposal(job.id)}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-600"
            >
              Send Proposal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
