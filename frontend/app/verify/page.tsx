"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyPageContent() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying, please wait...");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setMessage("Invalid token");
      setTimeout(() => router.push("/"), 2000);
      return;
    }
    axios.post("/api/verify", { token }).then((res) => {
      setLoading(false);
      console.log("Verify: ", res.data.response);
      if (res.data.response === true) {
        setMessage("Account verified successfully");
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setMessage("Account verification failed");
        setTimeout(() => router.push("/"), 2000);
      }
    });
  }, [token, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <p style={{ fontSize: "1.5rem", color: "#0070f3" }}>Loading...</p>
      ) : (
        <p style={{ fontSize: "1.5rem", color: "#0070f3" }}>{message}</p>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}
