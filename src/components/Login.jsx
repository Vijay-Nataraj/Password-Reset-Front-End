import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    await axios
      .post("http://localhost:3000/api/v1/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          console.log("Login successful");
          alert("Login successful");
          navigate(`/dashboard`);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Invalid credentials");
        alert("Invalid credentials");
        navigate(`/login`);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="shadow p-5 mt-5 w-50">
        <h4 className="text-center">Log in to App</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
            <Link to="/">
              <button className="btn btn-dark h-100 w-100 mt-3">Back</button>
            </Link>
            <div className="mt-3">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
