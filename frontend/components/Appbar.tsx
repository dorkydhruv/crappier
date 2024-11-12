"use client";
import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Appbar() {
  const router = useRouter();
  return (
    <div className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href={`/`}>
        <Zap className='h-6 w-6' />
        <span className='sr-only'>Crappier</span>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Button
          className=''
          variant={"outline"}
          onClick={() => router.push("/signin")}
        >
          Sign In
        </Button>
        <Button onClick={() => router.push("/signup")}>Get Started</Button>
      </nav>
    </div>
  );
}
