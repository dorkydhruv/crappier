"use client";
import { Appbar } from "@/components/Appbar";
import CheckedFeature from "@/components/CheckedFeature";
import Divider from "@/components/Divider";
import InputLabel from "@/components/InputLabel";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Signup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className=' flex flex-col min-h-screen'>
      <Appbar />
      <div className='relative lg:flex lg:justify-center lg:items-center mt-5 '>
        <div className='lg:grid lg:grid-cols-2 m-10 sm:flex sm:justify-center items-center  '>
          <div className='lg:flex-col lg:items-center '>
            <div className='text-4xl max-w-lg font-serif mb-4'>
              Join (thousands?) of Solana users who automate their transactions
              with Crappier.
            </div>
            <CheckedFeature title='Effortless setup, no coding required.' />
            <CheckedFeature title='Free to use for basic automation.' />
            <CheckedFeature title='Securely automate your Solana wallet.' />
          </div>
          <div className='border lg:p-10 p-5 flex-col rounded-lg'>
            <InputLabel
              type='email'
              label='Email'
              placeholder=''
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputLabel
              type='text'
              label='Username'
              placeholder=''
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <InputLabel
              type='password'
              label='Password'
              placeholder=''
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className='flex mt-2'>
              <Button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const response = await axios.post("/api/signup", {
                      email,
                      password,
                      name: username,
                    });
                    setLoading(false);
                    toast({
                      title: response.data.message,
                    });
                    // Route to sign in page
                  } catch (e) {
                    console.error(e);
                    toast({
                      title: "Internal server error",
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Sign up
              </Button>
            </div>
            <Divider text='OR' />
            <Button
              className='w-full bg-[#4285f4] hover:bg-[#3367d6]'
              onClick={() => {
                signIn("google", {
                  redirect: false,
                  callbackUrl: "/dashboard",
                });
              }}
            >
              <div className='flex justify-between'>
                <div className='text-white'>Continue with Google</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-transparent flex justify-center items-center'>
          <Loader />
        </div>
      )}
    </div>
  );
}
