import instance from "./instance";

const token = localStorage.getItem("token");

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const jobServices = {
  getAvailableJobs: async () => {
    return await instance.get("/jobs/available");
  },
  getAllJobs: async () => {
    return await instance.get("/jobs/all");
  },
  createJob: async (data) => {
    return await instance.post("/jobs/create", data);
  },
  updateJob: async (jobId, data) => {
    return await instance.put(`/jobs/update/${jobId}`, data);
  },
  deleteJob: async (jobId) => {
    return await instance.delete(`/jobs/${jobId}`);
  },
  searchFreelancers: async (params) => {
    return await instance.search(`/jobs/searchFreelancers`, { params });
  },

  createProposal: async (proposalData) => {
    return await instance.post("/proposals/create", proposalData);
  },
  getProposalsForClient: async () => {
    return await instance.get("/proposals/client"); // Replace with actual client ID
  },
  acceptProposal: async (proposalId) => {
    return await instance.put(`/proposals/accept/${proposalId}`);
  },
  rejectProposal: async (proposalId) => {
    return await instance.put(`/proposals/reject/${proposalId}`);
  },
};

export default jobServices;
