"use client";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Appbar } from "@/components/Appbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  if (session.data?.user) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />
      <Hero />
      <Footer />
    </div>
  );
}
