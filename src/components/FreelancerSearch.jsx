import React, { useState, useEffect } from "react";
import jobServices from "../services/jobServices";

const FreelancerSearch = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rating, setRating] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(value)
        ? prevSkills.filter((skill) => skill !== value)
        : [...prevSkills, value]
    );
  };

  const handleFilter = async () => {
    try {
      const response = await jobServices.searchFreelancers({
        skill: selectedSkills.join(","),
        rating,
        minBudget,
        maxBudget,
      });
      setFreelancers(response.data);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };

  useEffect(() => {
    handleFilter(); // Run filter when component is mounted or filters are updated
  }, [selectedSkills, rating, minBudget, maxBudget]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Find a Freelancer
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name or skills"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-lg border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Skills Filter */}
          <div>
            <label className="block text-gray-600 mb-2">Skills</label>
            <select
              multiple
              onChange={handleSkillChange}
              value={selectedSkills}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="web">Web Development</option>
              <option value="design">Graphic Design</option>
              <option value="seo">SEO Optimization</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-gray-600 mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Any</option>
              <option value="4">4 & above</option>
              <option value="3">3 & above</option>
              <option value="2">2 & above</option>
              <option value="1">1 & above</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="block text-gray-600 mb-2">Min Budget</label>
            <input
              type="number"
              placeholder="Min Budget"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Max Budget</label>
            <input
              type="number"
              placeholder="Max Budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Apply Filters
          </button>
        </div>

        {/* Freelancer Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.length > 0 ? (
            freelancers.map((freelancer) => (
              <div
                key={freelancer._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:bg-gradient-to-r from-gray-200 to-gray-300 transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {freelancer.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Skills: {freelancer.skills.join(", ")}
                </p>
                <p className="text-gray-500 mb-2">
                  <span className="font-medium">Rating:</span>{" "}
                  {freelancer.rating}
                </p>
                <p className="text-gray-500 mb-4">
                  <span className="font-medium">Budget:</span> $
                  {freelancer.budget}
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  Contact
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">
              No freelancers found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerSearch;
