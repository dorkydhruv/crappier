import { Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FundPot } from "./FundPot";
import { ProfileAvatar } from "./ProfileAvatar";

export const DashboardHeader = () => {
  const { data: session, status } = useSession();

  return (
    <header className='bg-gradient-to-r from-slate-50 to-white border-b px-6 py-4 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div
            className='flex items-center space-x-3 cursor-pointer'
            onClick={() => (window.location.href = "/")}
          >
            <div className='p-2 bg-blue-50 rounded-lg'>
              <Zap className='h-6 w-6 text-blue-500' />
            </div>
            <div>
              <h1 className='text-2xl font-bold hidden md:block bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-600'>
                Welcome back, {session?.user?.name}
              </h1>
              <p className='text-sm text-slate-500'></p>
            </div>
          </div>
        </div>
        {status === "authenticated" && (
          <div className='flex items-center space-x-4'>
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
            <div className='bg-white/50 backdrop-blur-sm hidden md:block rounded-lg shadow-sm border'>
              <FundPot email={session?.user?.email ?? ""} />
            </div>
            <ProfileAvatar user={session?.user} />
          </div>
        )}
      </div>
    </header>
  );
};
