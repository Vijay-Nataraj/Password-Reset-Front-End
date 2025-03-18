import React, { useState, useEffect } from "react";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    proposalId: "",
    freelancerId: "",
    clientId: "",
    startDate: "",
    endDate: "",
    terms: "",
    status: "active",
  });

  const fetchContracts = async () => {
    try {
      const response = await axios.get(
        "/api/contracts/yourClientOrFreelancerId"
      );
      setContracts(response.data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  const createContract = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contracts/create", newContract);
      fetchContracts(); // Reload contracts
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Contracts
        </h1>

        {/* Contract Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Create Contract
          </h2>
          <form onSubmit={createContract} className="space-y-4">
            <input
              type="text"
              placeholder="Proposal ID"
              value={newContract.proposalId}
              onChange={(e) =>
                setNewContract({ ...newContract, proposalId: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Terms"
              value={newContract.terms}
              onChange={(e) =>
                setNewContract({ ...newContract, terms: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              value={newContract.startDate}
              onChange={(e) =>
                setNewContract({ ...newContract, startDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              value={newContract.endDate}
              onChange={(e) =>
                setNewContract({ ...newContract, endDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Create Contract
            </button>
          </form>
        </div>

        {/* Contract List */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your Contracts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* {contracts.length > 0 ? (
            contracts.map((contract) => (
              <div
                key={contract._id}
                className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Proposal ID: {contract.proposalId}
                </h3>
                <p className="text-gray-600 mb-2">
                  Start Date: {contract.startDate}
                </p>
                <p className="text-gray-600 mb-2">
                  End Date: {contract.endDate}
                </p>
                <p className="text-gray-600">Status: {contract.status}</p>
                <p className="text-gray-500">{contract.terms}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No contracts found.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Contracts;
