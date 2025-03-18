import React, { useState } from "react";
import authServices from "../services/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await authServices.forgotPassword({ email });
      console.log("Password reset email sent");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
