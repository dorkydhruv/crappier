import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Appbar } from "@/components/Appbar";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />
      <Hero />
      <Footer />
    </div>
  );
}
