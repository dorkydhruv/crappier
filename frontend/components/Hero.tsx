"use client";
import {
  Boxes,
  Zap,
  Webhook,
  WashingMachine,
  Sparkles,
  ArrowRight,
  Shield,
  Rocket,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Hero() {
  const { status } = useSession();
  const router = useRouter();
  return (
    <>
      <section className='container mx-auto px-4 sm:px-6 pt-32 pb-48'>
        <div className='max-w-4xl mx-auto text-center relative'>
          <div className='absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-conic from-[#EBFF00]/20 via-blue-100/20 to-[#EBFF00]/20 opacity-50 blur-3xl -z-10 animate-slow-spin' />
          <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#EBFF0015,transparent)] -z-10' />
          <Sparkles className='h-12 w-12 mx-auto mb-8 text-[#EBFF00] animate-pulse' />
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight'>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-600'>
              Automate Your
            </span>
            <br />
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900'>
              Solana Transactions
            </span>
          </h1>

          <p className='mt-8 text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto'>
            Connect apps, trigger actions, and streamline your workflow.
            <br />
            <span className='font-medium'>One automated platform.</span>
          </p>

          <div className='mt-12 flex items-center justify-center gap-6'>
            <Button
              size='lg'
              className='group bg-[#EBFF00] text-black hover:bg-[#D4E600] font-semibold px-8 py-7 text-lg rounded-xl
                transition-all duration-300 hover:shadow-[0_0_30px_-5px_#EBFF00]'
              onClick={() => {
                if (status === "unauthenticated") {
                  router.push("/signup");
                } else {
                  router.push("/dashboard");
                }
              }}
            >
              <Rocket className='mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              Get Started
              <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </Button>
          </div>

          <div className='mt-16 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-neutral-600'>
            {[
              {
                icon: <Shield className='h-4 w-4' />,
                text: "Secure Transactions",
                gradient: "from-green-400 to-green-600",
              },
              {
                icon: <Zap className='h-4 w-4 text-black' />,
                text: "Lightning Fast",
                gradient: "from-blue-500 to-purple-600 ",
              },
              {
                icon: <Boxes className='h-4 w-4' />,
                text: "Automated Workflow",
                gradient: "from-yellow-400 to-yellow-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-neutral-200/50 hover:border-[#EBFF00]/50 transition-colors'
              >
                <div
                  className={`bg-gradient-to-r ${item.gradient} p-1 rounded-full`}
                >
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='w-full py-32 relative bg-gradient-to-b from-white to-neutral-50'>
        <div className='container px-6 mx-auto max-w-7xl'>
          <div className='max-w-2xl mx-auto text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600 mb-4'>
              How it works
            </h2>
            <p className='text-neutral-600'>
              See the finner details of how Crappier automates your Solana
              transactions.
            </p>
          </div>

          <div className='grid gap-8 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <div key={index} className='transform hover:z-10'>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
}) => {
  return (
    <Card
      className='group relative overflow-hidden bg-white/80 backdrop-blur-xl border-neutral-200/50 
      shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
      hover:border-[#EBFF00]/50 before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/10 before:to-transparent
      before:-translate-x-full hover:before:translate-x-full before:transition-transform
      before:duration-1000 before:ease-out h-full flex flex-col'
    >
      <CardHeader>
        <CardTitle
          className='flex items-center text-2xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-neutral-950 to-neutral-600'
        >
          <div className='bg-neutral-50/50 border p-2 rounded-lg mr-3'>
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <CardDescription className='px-6 text-lg text-neutral-600'>
          {description}
        </CardDescription>
        <div className='mt-4 overflow-hidden rounded-lg'>
          <Image
            src={image}
            width={400}
            height={300}
            alt={title}
            className='object-cover w-full h-full'
          />
        </div>
      </CardContent>
    </Card>
  );
};

const features = [
  {
    title: "Fund your automation pot",
    description: "Deposit funds into your Crappier automation pot.",
    icon: <WashingMachine className=' h-6 w-6 text-[#EBFF00]' />,
    image: "/first.png",
  },
  {
    title: "Configure webhook trigger",
    description:
      "Set up a webhook trigger to initiate the automated transaction.",
    icon: <Webhook className=' h-6 w-6 text-[#EBFF00]' />,
    image: "/second.png",
  },
  {
    title: "Automate your transaction",
    description: "Sit back and let Crappier automate your Solana transactions.",
    icon: <Boxes className=' h-6 w-6 text-[#EBFF00]' />,
    image: "/third.png",
  },
];
