"use client";
import Image from "next/image";
import {
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { fundPotTx } from "@/lib/functions/pot/fundPotTx";
import { connection } from "@/constants/const";
import { useState } from "react";
import { getPotBalance } from "@/hooks/getPotBalance";
import SmallLoader from "./SmallLoader";
import { Wallet, TrendingUp, History } from "lucide-react";

export const FundPot = (user: { email: string }) => {
  const { toast } = useToast();
  const { signTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { balance, balanceLoading } = getPotBalance(user.email);
  const handleFundPot = async () => {
    if (!publicKey || !signTransaction) {
      toast({ title: "Wallet not connected" });
      return;
    }
    setLoading(true);
    try {
      const transaction = await fundPotTx({
        amount,
        fromPublickey: publicKey,
        email: user.email,
      });
      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "processed");
      toast({
        title: "Pot funded successfully",
        description: `See transaction...`,
        onClick: () =>
          window.open(
            `https://explorer.solana.com/tx/${signature}?cluster=devnet`
          ),
      });
    } catch (error) {
      toast({ title: `Transaction failed: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='group border border-black/80 hover:border-black transition-all duration-300
             bg-gradient-to-r hover:from-[#EBFF00]/10 hover:to-transparent'
        >
          <TrendingUp className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform' />
          Fund pot 🍯
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[425px]  bg-white'>
        <AlertDialogHeader className='space-y-4'>
          <AlertDialogTitle className='flex items-center gap-2'>
            <Wallet className='h-5 w-5' />
            Fund Your Automation Pot
          </AlertDialogTitle>
          <AlertDialogDescription className='space-y-4'>
            <span className='flex items-center gap-2 bg-neutral-50 p-3 rounded-lg'>
              <Image src={"/solana.png"} width={30} height={30} alt='solana' />
              <Input
                type='number'
                placeholder='Enter amount'
                min={0.0}
                step={0.01}
                onChange={(e) => setAmount(Number(e.target.value))}
                className='w-50 border-none bg-transparent focus-visible:ring-0'
                required
              />
              <span className='text-black font-bold'>SOL</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex justify-between items-center space-x-4 pt-4'>
          <div className='flex items-center gap-2 bg-neutral-50/50 px-3 py-2 rounded-lg'>
            <History className='w-4 h-4 text-neutral-500' />
            <p className='text-sm text-muted-foreground'>
              Current balance:{" "}
              {balanceLoading ? (
                <SmallLoader />
              ) : (
                <span className='font-bold'>{balance} SOL</span>
              )}
            </p>
          </div>
          <Button
            onClick={handleFundPot}
            disabled={loading}
            className='bg-[#EBFF00] text-black border-black border hover:bg-[#D4E600] transition-all duration-300'
          >
            {loading ? (
              <SmallLoader />
            ) : (
              <>
                <TrendingUp className='w-4 h-4 mr-2' />
                Fund Now
              </>
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
