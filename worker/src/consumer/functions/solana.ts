import { JsonObject } from "@prisma/client/runtime/library";
import { parser } from "./parser";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection, PROGRAM_ID } from "../../const";
import {
  AnchorProvider,
  BN,
  Idl,
  Program,
  Provider,
  Wallet,
} from "@coral-xyz/anchor";
import idl from "../../idl.json";
export async function solanaWorker(
  payload: any,
  metadata: JsonObject,
  email: string
) {
  const amount = metadata.amount;
  const publicKey = metadata.publicKey;
  const parsedAmount = parser(amount?.toString() ?? "", payload);
  const parsedTo = parser(publicKey?.toString() ?? "", payload);

  //Send Solana using Program
  console.log(
    "Sending Solana publicKey ",
    parsedTo,
    " with amount ",
    parsedAmount
  );
  try {
    const provider = new AnchorProvider(connection, Wallet.local());
    const program = new Program(idl as Idl, provider);
    const tx = await program.methods
      .transferSolToAccount(
        email,
        new BN(Number(parsedAmount) * LAMPORTS_PER_SOL)
      )
      .accounts({
        reciever: parsedTo,
      })
      .rpc();
    console.log(tx);
  } catch (e) {
    console.log(e);
  }
}
