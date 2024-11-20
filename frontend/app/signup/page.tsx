"use client";
import { Appbar } from "@/components/Appbar";
import CheckedFeature from "@/components/CheckedFeature";
import Divider from "@/components/Divider";
import InputLabel from "@/components/InputLabel";
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
  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />
      <div className='lg:flex lg:justify-center lg:items-center mt-5 '>
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
                  console.log("signup");
                  const response = await axios.post("/api/signup", {
                    email,
                    password,
                    name: username,
                  });
                  toast({
                    title: response.data.message,
                  });
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
                  callbackUrl: "/",
                });
              }}
            >
              <div className='flex justify-between'>
                {/* <Image
                  src='https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F14086%2Fgoogle&psig=AOvVaw2ZTK7csTn1ua1SzA-djft5&ust=1731495484551000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjK4qrR1okDFQAAAAAdAAAAABAw'
                  alt='google'
                  width={20}
                  height={20}
                /> */}
                <div className='text-white'>Continue with Google</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
