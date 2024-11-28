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
      toast({ title: "Transaction failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="border border-black">Fund pot 🍯</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            How much would you like to fund the pot?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className='flex items-center gap-2'>
              <Image src={"/solana.png"} width={30} height={30} alt='solana' />
              <Input
                type='number'
                placeholder='Amount'
                min={0.0}
                step={0.01}
                onChange={(e) => setAmount(Number(e.target.value))}
                className='w-50'
                required
              />
              <span className='text-black font-bold'>SOL</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm text-muted-foreground'>
              Your current pot balance is{" "}
              {balanceLoading ? (
                <SmallLoader />
              ) : (
                <span className='font-bold'>{balance} SOL</span>
              )}
            </p>
          </div>
          <Button onClick={handleFundPot}  disabled={loading}>
            {loading ? <SmallLoader /> : "Fund"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
