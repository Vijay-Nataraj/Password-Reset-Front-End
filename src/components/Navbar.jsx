import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    // Clear all from localStorage
    localStorage.clear();

    // Update the state after logout
    setIsLoggedIn(false);
    setUserRole(null);

    // Navigate to the homepage or login page after logout
    navigate("/");
  };

  return (
    <div className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            to="/"
            className="text-white text-2xl font-bold hover:text-blue-400 transition"
            style={{ textDecoration: "none" }}
          >
            Freelance Marketplace
          </Link>
        </div>

        <nav>
          <div className="space-x-6">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Render different links based on user role */}
                {userRole === "freelancer" && (
                  <>
                    <Link
                      to="/user/freelancer-dashboard"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/user/freelancer-dashboard/services/create"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      create a service
                    </Link>
                    <Link
                      to="/user/freelancer-dashboard/services"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      My services
                    </Link>
                    <Link
                      to="/user/profile"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Profile
                    </Link>
                  </>
                )}

                {userRole === "client" && (
                  <>
                    <Link
                      to="/user/client-dashboard"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/user/client-dashboard/create-job"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Post a Job
                    </Link>
                    <Link
                      to="/user/client-dashboard/freelancer-search"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Find a Freelancer
                    </Link>
                    <Link
                      to="/user/profile"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/payment"
                      className="text-white hover:text-blue-400 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Payment
                    </Link>
                  </>
                )}

                {/* Common Links for both roles */}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-400 transition"
                  style={{ textDecoration: "none" }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
