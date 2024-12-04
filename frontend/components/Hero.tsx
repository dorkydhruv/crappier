"use client";
import { ArrowRight, Mail, Webhook, Zap } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";
import { GITHUB_URL } from "@/constants/const";
import { useSession } from "next-auth/react";

export const Hero = () => {
  const router = useRouter();
  const { data } = useSession();
  return (
    <main className='flex-1'>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Welcome to Crappier
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Automate your Solana transactions with ease. Connect apps,
                trigger actions, and streamline your workflow.
              </p>
            </div>
            <div className='space-x-4'>
              <Button
                onClick={() => {
                  if (data?.user?.email) router.push("/dashboard");
                  else router.push("/signup");
                }}
              >
                Get Started
              </Button>
              <Button variant='outline' onClick={() => router.push(GITHUB_URL)}>
                Github 🐙
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
            Our Features
          </h2>
          <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Zap className='mr-2 h-4 w-4' />
                  Solana Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Send Solana transactions automatically based on your custom
                  triggers and actions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Mail className='mr-2 h-4 w-4' />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive detailed email notifications for every transaction,
                  keeping you informed.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Webhook className='mr-2 h-4 w-4' />
                  Webhook Triggers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use webhooks to trigger actions in Crappier from any external
                  service or application.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
            How It Works
          </h2>
          <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
                <span className='text-2xl font-bold'>1</span>
              </div>
              <h3 className='text-xl font-bold'>Connect Your Apps</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Link your Solana wallet and other applications to Crappier.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
                <span className='text-2xl font-bold'>2</span>
              </div>
              <h3 className='text-xl font-bold'>Create a Workflow</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Set up triggers and actions for your Solana transactions.
              </p>
            </div>
            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
                <span className='text-2xl font-bold'>3</span>
              </div>
              <h3 className='text-xl font-bold'>Let Crappier Work</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Sit back and let Crappier automate your Solana transactions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Ready to Automate Your Solana Transactions?
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Join Crappier today and experience the power of automated Solana
                transactions with email notifications and webhook triggers.
              </p>
            </div>
            <Button
              className='flex items-center'
              onClick={() => {
                if (data?.user?.email) router.push("/dashboard");
                else router.push("/signup");
              }}
            >
              Get Started
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
