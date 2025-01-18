import { AnimatedGridBackground } from "@/components/AnimatedGridBackground";
import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { DashboardDemo } from "@/components/dashboard-demo";

export default function Page() {
  return (
    <div className='relative min-h-screen'>
      <AnimatedGridBackground />
      <Appbar scrollThreshold={20} />
      <div className='relative z-10'>
        <Hero />
        <DashboardDemo />
      </div>
    </div>
  );
}
