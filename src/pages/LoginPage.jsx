import React, { useState } from "react";
import authServices from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = { email, password };
      const response = await authServices.login(data);

      const { token, role, freelancerID } = response;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("freelancerID", freelancerID);

        setEmail("");
        setPassword("");

        setTimeout(() => {
          if (role === "freelancer") {
            navigate("/user/freelancer-dashboard");
          } else if (role === "client") {
            navigate("/user/client-dashboard");
          }
        }, 500);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="shadow-lg p-8 m-5 w-96 bg-white rounded-lg">
        <h4 className="text-center text-2xl font-semibold mb-4">
          Log in to App
        </h4>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 px-4 rounded hover:bg-blue-900 transition duration-300"
            >
              Login
            </button>
            <br /> <br />
            <Link to="/">
              <button className="w-full bg-gray-700 text-white p-3 px-4 rounded hover:bg-gray-900 transition duration-300">
                Back
              </button>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgotten password?
            </Link>
            &nbsp; &nbsp;
            <Link
              to="/register"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
