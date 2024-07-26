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
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          username: lname,
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
      <img className="logo" src={myImage} alt="Logo" />
      <form onSubmit={handleRegister}>
        <h3>Signup</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => setFname(e.target.value)}
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
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <ToastContainer />
    </>
  );
}

export default Register;
