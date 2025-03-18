import React, { useEffect, useState } from "react";
import serviceServices from "../services/serviceServices";

const Latestservices = () => {
  const [services, setservices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchservices = async () => {
      try {
        const response = await serviceServices.getAllServices();
        // console.log(response);
        setservices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchservices();
  }, [loading]);

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
        Freelancer services
      </h2>
      <div className="space-y-6">
        {services.map((service, index) => (
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
              <span className="text-sm text-gray-500">{service.category}</span>
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
        ))}
      </div>
    </div>
  );
};

export default Latestservices;
