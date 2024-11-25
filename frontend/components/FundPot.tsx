"use client";
import Image from "next/image";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { fundPotTx } from "@/lib/fundPotTx";
import { connection } from "@/constants/const";
import { useState } from "react";

export const FundPot = () => {
  const { toast } = useToast();
  const { signTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>Fund pot 🍯</Button>
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
              <span className="text-black font-bold">SOL</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (!publicKey) {
                toast({
                  title: "Error",
                  description: "Please connect your wallet",
                });
                return;
              }
              const tx = await fundPotTx({
                amount,
                fromPublickey: publicKey,
              });
              if (!signTransaction) return;
              if (!tx) return;
              const txSigned = await signTransaction(tx);
              console.log("txsigned", txSigned);
              if (!txSigned) return;
              const txId = await connection.sendRawTransaction(
                txSigned.serialize()
              );
              console.log(txId);
              await connection.confirmTransaction(txId);
              toast({
                title: "Success",
                description: `Funded the pot with ${amount} SOL. Check the transaction here: https://explorer.solana.com/tx/${txId}?cluster=devnet`,
                onClick: () =>
                  window.open(
                    `https://explorer.solana.com/tx/${txId}?cluster=devnet`
                  ),
              });
            }}
          >
            Pay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
