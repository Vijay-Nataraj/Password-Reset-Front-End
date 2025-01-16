import { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Assumes token is passed as a URL parameter
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`/api/reset-password/${token}`, {
        password,
      });
      setMessage(response.data.message);

      alert("Password successfully reset");

      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="shadow p-5 mt-5 w-50">
        <h4 className="text-center">Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-primary h-100 w-100">
              Reset Password
            </button>
            <Link to="/">
              <button className="btn btn-dark h-100 w-100 mt-3">Back</button>
            </Link>
          </div>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
