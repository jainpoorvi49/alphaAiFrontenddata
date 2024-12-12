"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";
import AxiosInstance from "../axios/api";

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No token found. Redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const response = await AxiosInstance.get("user/data/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          if (data && data.data && Array.isArray(data.data)) {
            setUserData(data.data);
          } else {
            setError("Unexpected data format received.");
          }
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized access. Redirecting to login...");
          localStorage.removeItem("access_token");
          router.push("/login");
        } else {
          setError("An error occurred while fetching user data.");
          console.error(err); // Log error for debugging
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [router]);

  const handleStopTrading = (userId) => {
    alert(`Stopping trading for User ID: ${userId}`);
  };

  const handleStopAllTrading = () => {
    alert("Stopping trading for all users!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.profilePicWrapper}>
        <img
          src="https://i.pinimg.com/236x/d0/9a/38/d09a38017048ec506b4564d5048352c1.jpg"
          alt="Profile Picture"
          className={styles.profilePic}
        />
      </div> */}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>UserId</th>
              <th>UserName</th>
              <th>BrokerName</th>
              <th>Capital</th>
              <th>Margin</th>
              <th>Used Margin</th>
              <th>% Return</th>
              <th>Number of Orders Pinched</th>
              <th>Last Order Time</th>
              <th>Unfilled Buy Limit Option</th>
              <th>Running M2M</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.userName || "No data available"}</td>
                <td>{user.broker_name || "No data available"}</td>
                <td>{user.capital || "No data available"}</td>
                <td>{user.margin || "No data available"}</td>
                <td>{user.used_margin || "No data available"}</td>
                <td>{user.return_percentage || "No data available"}</td>
                <td>{user.number_of_orders_pinched || "No data available"}</td>
                <td>{user.last_order_time || "No data available"}</td>
                <td>{user.unfilled_buy_limit_option || "No data available"}</td>
                <td
                  style={{
                    color:
                      user.running_m2m === "No data available"
                        ? "black"
                        : user.running_m2m > 0
                        ? `rgba(0, 128, 0, ${Math.max(
                            0.5,
                            Math.min(1, Math.abs(user.running_m2m) / 100000)
                          )})`
                        : `rgba(255, 0, 0, ${Math.max(
                            0.5,
                            Math.min(1, Math.abs(user.running_m2m) / 100000)
                          )})`,
                    fontWeight: "bold",
                  }}
                >
                  {user.running_m2m === "No data available"
                    ? "₹0"
                    : isNaN(user.running_m2m)
                    ? "₹0"
                    : user.running_m2m > 0
                    ? `₹${user.running_m2m}`
                    : `-₹${Math.abs(user.running_m2m)}`}
                </td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.stopButton}`}
                    onClick={() => handleStopTrading(user.user_id)}
                  >
                    Stop Trading
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actionsWrapper}>
        <button
          className={`${styles.actionButton} ${styles.stopAllButton}`}
          onClick={handleStopAllTrading}
        >
          Stop All Trading
        </button>
        <button
          className={`${styles.actionButton} ${styles.addButton}`}
          onClick={() => router.push("/addUser")}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default Profile;
