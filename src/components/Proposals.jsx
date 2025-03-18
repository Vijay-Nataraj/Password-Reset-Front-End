import React, { useState, useEffect } from "react";
import axios from "axios";

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({
    jobId: "",
    freelancerId: "",
    clientId: "",
    budget: "",
    description: "",
    status: "pending",
  });

  // Function to fetch proposals from the server (if you want to display them)
  const fetchProposals = async () => {
    try {
      const response = await axios.get("/api/proposals"); // Replace with your API endpoint
      setProposals(response.data);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    }
  };

  // Function to handle creating a new proposal
  const createProposal = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API call
      const response = await axios.post("/api/proposals", newProposal);
      alert("Proposal sent successfully!");
      setNewProposal({
        jobId: "",
        freelancerId: "",
        clientId: "",
        budget: "",
        description: "",
        status: "pending",
      }); // Reset the form
    } catch (err) {
      alert("Error sending proposal: " + err.message);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Proposals
        </h1>

        {/* Proposal Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Create Proposal
          </h2>
          <form onSubmit={createProposal} className="space-y-4">
            <input
              type="text"
              placeholder="Job ID"
              value={newProposal.jobId}
              onChange={(e) =>
                setNewProposal({ ...newProposal, jobId: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              placeholder="Budget"
              value={newProposal.budget}
              onChange={(e) =>
                setNewProposal({ ...newProposal, budget: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Description"
              value={newProposal.description}
              onChange={(e) =>
                setNewProposal({ ...newProposal, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit Proposal
            </button>
          </form>
        </div>

        {/* Proposal List */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your Proposals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Job ID: {proposal.jobId}
                </h3>
                <p className="text-gray-600 mb-2">Budget: ${proposal.budget}</p>
                <p className="text-gray-600 mb-2">Status: {proposal.status}</p>
                <p className="text-gray-500">{proposal.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No proposals found.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Proposals;
