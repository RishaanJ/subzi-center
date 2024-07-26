import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in Successfully! Welcome again to Subzi Center", {
        position: "top-center",
      });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          New user? <a href="/register">Register Here</a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
