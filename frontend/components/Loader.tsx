import { Rocket } from "lucide-react";

export const Loader = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-white relative'>
      {/* Background gradients */}
      <div className='absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-conic from-[#EBFF00]/20 via-blue-100/20 to-[#EBFF00]/20 opacity-50 blur-3xl -z-10 animate-slow-spin' />
      <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,#EBFF0015,transparent)] -z-10' />

      {/* Loader content */}
      <div className='relative flex flex-col items-center'>
        <div className='relative'>
          {/* Outer spinning ring */}
          <div className='absolute inset-0 rounded-full border-8 border-[#EBFF00] animate-[spin_3s_linear_infinite]' />

          {/* Middle pulsing circle */}
          <div className='absolute inset-2 rounded-full bg-gradient-to-r from-[#EBFF00]/10 to-blue-500/10 animate-pulse' />

          {/* Center icon */}
          <div className='relative h-16 w-16 flex items-center justify-center'>
            <Rocket className='h-8 w-8 animate-bounce' />
          </div>
        </div>

        {/* Loading text */}
        <div className='mt-8 text-center'>
          <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600'>
            Loading your automations
          </h3>
          <p className='text-neutral-600 mt-2 animate-pulse'>
            Preparing your workflow...
          </p>
        </div>

        {/* Mini cards decoration */}
        <div className='absolute -z-10 flex gap-4 blur-sm opacity-30'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='w-12 h-12 rounded-lg bg-white border border-neutral-200/50 animate-float'
              style={{
                animationDelay: `${i * 0.2}s`,
                transform: `translateY(${i % 2 ? 20 : -20}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
