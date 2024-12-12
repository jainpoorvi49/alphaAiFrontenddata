"use client";

import React, { useState } from "react";
import styles from "./addUser.module.css";
import AxiosInstance from "../axios/api";

const AddUser = () => {
  // State to store the form data
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [broker, setBroker] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const newUserData = {
      user_id: userId.trim(),
      password: password.trim(),
      mobile_number: mobile.trim(),
      broker_name: broker.trim(),
    };

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("access_token");

      // Send the API request
      const response = await AxiosInstance.post("/user/add/", newUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure the correct content type
        },
      });

      setSuccess("User created successfully!");
      setError("");

      // Reset form fields
      setUserId("");
      setPassword("");
      setMobile("");
      setBroker("");
    } catch (error) {
      if (error.response) {
        // Handle API response errors
        console.error("API Error Response:", error.response.data);
        setError("Error:Some thing went wrong");
      } else {
        // Handle general errors
        console.error("Error Details:", error.message);
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add User</h1>

      {/* Display success or error messages */}
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="broker">Broker Name</label>
          <input
            type="text"
            id="broker"
            placeholder="Enter Broker Name"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
