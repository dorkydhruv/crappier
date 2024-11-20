"use client";
import { CookingPot, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProfileAvatar } from "./ProfileAvatar";

export function Appbar() {
  const { data, status, update } = useSession();
  const router = useRouter();
  return (
    <div className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center gap-4' href={`/`}>
        <Zap className='h-6 w-6' />
        <h1 className='text-xl font-bold'>Crappier</h1>
      </Link>
      <nav className='ml-auto flex '>
        {status === "unauthenticated" && (
          <div className='ml-auto flex gap-4 sm:gap-6'>
            <Button
              className=''
              variant={"outline"}
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
            <Button onClick={() => router.push("/signup")}>Get Started</Button>
          </div>
        )}
        {status === "authenticated" && (
          <div className='ml-auto flex gap-4 sm:gap-6'>
            <CookingPot className='h-7 w-7' />
            <ProfileAvatar user={data.user} />
          </div>
        )}
      </nav>
    </div>
  );
}
