import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API_REGISTER_URL = "http://localhost:8080/api/auth/register";
const API_LOGIN_URL = "http://localhost:8080/api/auth/login";

const Register = () => {
  const [step, setStep] = useState(1); // 1 = Register, 2 = Login
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    role: "USER",
    profilePicture: null,
  });

 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(API_REGISTER_URL, formData);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => setStep(2), 1500);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Registration failed."));
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(API_LOGIN_URL, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setMessage("Logged in successfully!");
      setTimeout(() => navigate("/myblog"), 1500);
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data?.message || "Invalid credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>{step === 1 ? "Register" : "Login"}</h1>

        {message && <p className="message">{message}</p>}

        {step === 1 ? (
          // Register Form
          <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

            {/* Password Field (Always Visible) */}
            <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required></textarea>
            <input type="url" name="github" placeholder="GitHub Link" value={formData.github} onChange={handleChange} />
            <input type="url" name="linkedin" placeholder="LinkedIn Link" value={formData.linkedin} onChange={handleChange} />
            <input type="url" name="twitter" placeholder="Twitter Link" value={formData.twitter} onChange={handleChange} />

            <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            <p className="toggle-text">
              Already have an account? <button type="button" className="toggle-button" onClick={() => setStep(2)}>Log in</button>
            </p>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

           
            <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            <p className="toggle-text">
              Don't have an account? <button type="button" className="toggle-button" onClick={() => setStep(1)}>Register</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
