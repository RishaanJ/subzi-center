import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Adjust import paths if needed
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myImage from '../assets/text.png';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setUname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: uname,
        });
        toast.success("Welcome to Subzi Center!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="containing">
        <img className="logo" src={myImage} alt="Logo" />
        <form onSubmit={handleRegister}>
          <h3>Signup</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
