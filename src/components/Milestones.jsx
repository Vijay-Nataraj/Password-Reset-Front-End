import React, { useState, useEffect } from "react";
import axios from "axios";

const Milestones = ({ contractId }) => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState({
    contractId,
    title: "",
    description: "",
    deadline: "",
    status: "pending",
    progress: 0,
  });

  // Fetch milestones associated with the contract
  const fetchMilestones = async () => {
    try {
      const response = await axios.get(`/api/milestones/${contractId}`);
      setMilestones(response.data);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  // Create a new milestone
  const createMilestone = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/milestones/create", newMilestone);
      fetchMilestones(); // Reload milestones after creating a new one
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, [contractId]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Milestones
        </h1>

        {/* Create Milestone Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Create Milestone
          </h2>
          <form onSubmit={createMilestone} className="space-y-4">
            <input
              type="text"
              placeholder="Milestone Title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Description"
              value={newMilestone.description}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              value={newMilestone.deadline}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, deadline: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Create Milestone
            </button>
          </form>
        </div>

        {/* Milestone List */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Milestone List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* {milestones.length > 0 ? (
            milestones.map((milestone) => (
              <div
                key={milestone._id}
                className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 mb-2">{milestone.description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Deadline:</span>{" "}
                  {milestone.deadline}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  {milestone.status}
                </p>
                <p className="text-gray-500">
                  <span className="font-medium">Progress:</span>{" "}
                  {milestone.progress}%
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No milestones found.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Milestones;
