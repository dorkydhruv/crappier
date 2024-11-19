"use client";
import { validateToken } from "@/lib/functions/validateToken";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
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
    axios
      .post("/api/verify", {
        token,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.response) {
          setMessage("Account verified successfully");
          setTimeout(() => router.push("/signin"), 2000);
        } else {
          setMessage("Account verification failed");
          setTimeout(() => router.push("/"), 2000);
        }
        setLoading(false);
      });
  }, [token]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      {loading ? (
        <div className='text-center flex justify-center gap-10'>
          <div className='w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin'></div>
          <p className='mt-4 text-white text-xl'>{message}</p>
        </div>
      ) : (
        <div className='text-center'>
          <p className='text-white text-xl'>{message}</p>
        </div>
      )}
    </div>
  );
}
