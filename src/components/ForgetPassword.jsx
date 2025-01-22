import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `https://password-reset-back-end-elif.onrender.com/api/v1/forgot-password`,
        { email }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("Password reset link sent to your email");
          alert("Password reset link sent to your email");
          navigate(`/login`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="shadow p-5 mt-5 w-50">
        <h4 className="text-center">Forgot Password</h4>
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
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-primary h-100 w-100">
              Send Reset Link
            </button>
            <Link to="/">
              <button className="btn btn-dark h-100 w-100 mt-3">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
