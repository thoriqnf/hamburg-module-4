"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function PrivatePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/");
    }
  }, []);
  return <div>PrivatePage</div>;
}

export default PrivatePage;
