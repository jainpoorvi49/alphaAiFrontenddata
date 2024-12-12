"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for routing
import styles from "./auth.module.css"; // Import styles
import AxiosInstance from "../axios/api"; // Import Axios instance

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter(); // Initialize Next.js router

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!userId || !password) {
            setError("Both fields are required!");
            return;
        }

        // Clear error
        setError("");

        // Set loading state to true
        setLoading(true);

        try {
            // Send POST request to the backend API for authentication
            const response = await AxiosInstance.post("user/login/", {
                username: userId,
                password,
            });

            // Access the data directly
            const data = response.data;

            if (response.status === 200) {
                // Save tokens in local storage
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                
                // Redirect to the profile page
                router.push("/profile");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            // Handle backend error response or network issue
            console.error("Error response:", err.response);
            console.error("Error details:", err.message);
            setError(
                err.response?.data?.error || "An error occurred during login. Please try again."
            );
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Login to Your Account</h1>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.inputGroup}>
                    <label htmlFor="userId">User ID</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your User ID"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your Password"
                    />
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
