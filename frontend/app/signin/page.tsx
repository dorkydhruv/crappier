"use client";
import { Appbar } from "@/components/Appbar";
import CheckedFeature from "@/components/CheckedFeature";
import Divider from "@/components/Divider";
import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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
              onChange={() => {}}
            />
            <InputLabel
              type='password'
              label='Password'
              placeholder=''
              onChange={() => {}}
            />

            <div className='flex mt-2'>
              <Button>Sign in</Button>
            </div>
            <Divider text='OR' />
            <Button className='w-full bg-[#4285f4] hover:bg-[#3367d6]'>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
