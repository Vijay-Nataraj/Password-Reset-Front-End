import React, { useEffect, useState } from "react";
import serviceServices from "../services/serviceServices";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get freelancer ID and token from localStorage
  const freelancerID = localStorage.getItem("freelancerID");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchServices = async () => {
      if (!freelancerID) {
        setError("Freelancer is not logged in");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        // Fetch services for the logged-in freelancer with token in the Authorization header
        const response = await serviceServices.getServicesByfreelancerID(
          freelancerID,
          token
        );
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services: " + err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, [freelancerID, token]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        My Services
      </h2>
      <div className="space-y-6">
        {services.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No services available.
          </p>
        ) : (
          services.map((service, index) => (
            <div
              key={service.id || index}
              className="border border-gray-200 p-6 rounded-lg shadow-md bg-white hover:text-white hover:bg-gradient-to-r to-[#f7f8f8] from-[#6d6d6d] hover:decoration-blue-500 transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-800 mb-2">{service.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium text-green-600">{`$${service.price}`}</span>
                <span className="text-sm text-gray-500">
                  {service.category}
                </span>
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-800">Skills:</span>
                <ul className="flex text-gray-700 space-x-7">
                  {service.skills.map((skill, index) => (
                    <li key={index} className="list-disc">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceList;
