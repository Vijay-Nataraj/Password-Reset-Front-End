import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import serviceServices from "../services/serviceServices";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const freelancerID = localStorage.getItem("freelancerID");
  const username = localStorage.getItem("username");
  const clientID = localStorage.getItem("clientID");
  const clientname = localStorage.getItem("clientname");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const user = {
      freelancerID: localStorage.getItem("freelancerID"),
      username: localStorage.getItem("username"),
      clientID: localStorage.getItem("clientID"),
      clientname: localStorage.getItem("clientname"),
      email: localStorage.getItem("email"),
    };

    setUser(user);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="shadow-lg p-8 m-5 w-96 bg-white rounded-lg">
        <h4 className="text-center text-2xl font-semibold mb-4">
          User Profile
        </h4>
        {user ? (
          <div>
            <p className="mb-4">
              Name:{" "}
              {user.username !== undefined ? user.clientname : user.username}
            </p>
            <p className="mb-4">Email: {user.email}</p>
            <button
              className="w-full bg-blue-700 text-white p-3 px-4 rounded hover:bg-blue-900 transition duration-300"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-lg">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
