import instance from "./instance";

const token = localStorage.getItem("token");

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const serviceServices = {
  getAllServices: async () => {
    return await instance.get("/services/all");
  },
  createService: async (data) => {
    return await instance.post("/services/create", data);
  },
  getServicesByfreelancerID: async (freelancerID, token) => {
    return await instance.get(`/services/${freelancerID}`);
  },
  updateService: async (serviceId, data) => {
    return await instance.put(`/services/update/${serviceId}`, data);
  },
  deleteService: async (serviceId) => {
    return await instance.delete(`/services/${serviceId}`);
  },
  searchService: async () => {
    return await instance.get(`/services/`);
  },
};

export default serviceServices;
