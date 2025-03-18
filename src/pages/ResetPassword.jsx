import React, { useState } from "react";
import { useParams } from "react-router-dom";
import authServices from "../services/authServices";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      await authServices.resetPassword(token, { password });
      console.log("Password reset successful");
      window.location.href = "/login";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
