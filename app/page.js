"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to the login page
    router.push("/auth");
  }, [router]);

  return null; // No content is displayed on this page
};

export default Home;
