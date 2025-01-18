"use client";
import { Boxes, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProfileAvatar } from "./ProfileAvatar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FundPot } from "./FundPot";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Appbar({ scrollThreshold = 0 }: { scrollThreshold?: number }) {
  const { data, status } = useSession();
  const router = useRouter();
  const scroll = useScroll(scrollThreshold);
  const scrolled = scrollThreshold === 0 ? true : scroll;

  return (
    <div
      className={cn(
        "",
        scrollThreshold === 0
          ? "bg-white/80 backdrop-blur-sm border-b pb-20"
          : ""
      )}
    >
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-400",
          scrolled
            ? "bg-white/80 backdrop-blur-sm border-b"
            : "bg-transparent py-4"
        )}
      >
        <div className='container mx-auto px-4 w-[calc(100%-20px)] max-w-[1172px]'>
          <div
            className={cn(
              "flex h-20 items-center justify-between rounded-xl px-8"
            )}
          >
            <div className='flex items-center space-x-4'>
              <Link href='/' className='flex items-center space-x-3'>
                <Zap className='h-8 w-8' />
                <span className='text-2xl font-bold'>Crappier</span>
              </Link>
            </div>
            {status === "unauthenticated" && (
              <div className='flex items-center space-x-6'>
                <Button
                  className=''
                  variant={"outline"}
                  onClick={() => router.push("/signin")}
                >
                  Sign In
                </Button>
                {scrolled && (
                  <Button
                    className={cn(
                      "transition-all duration-500 transform",
                      scrolled
                        ? " bg-[#EBFF00] text-black hover:bg-[#D4E600]  border border-gray-200 translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0 pointer-events-none"
                    )}
                    onClick={() => router.push("/signup")}
                  >
                    <Boxes />
                    Get Started
                  </Button>
                )}
              </div>
            )}
            {status === "authenticated" && (
              <div className='flex items-center space-x-6'>
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    scrolled
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0 pointer-events-none"
                  )}
                >
                  <WalletMultiButton
                    style={{
                      padding: "0.5rem 0.8rem",
                      maxHeight: "2.3rem",
                      display: "flex",
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-text)",
                      borderRadius: "0.3rem",
                      border: `1px solid black`,
                      alignItems: "center",
                    }}
                  />
                </div>
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    scrolled
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0 pointer-events-none"
                  )}
                >
                  <FundPot email={data.user?.email ?? ""} />
                </div>
                <ProfileAvatar user={data.user} />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
