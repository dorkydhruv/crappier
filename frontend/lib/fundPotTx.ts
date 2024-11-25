import { connection, PROGRAM_ID } from "@/constants/const";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
export const fundPotTx = async ({
  amount,
  fromPublickey,
}: {
  amount: number;
  fromPublickey: PublicKey;
}) => {
  const [potAccount, potBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("pot"), Buffer.from("email")],
    PROGRAM_ID
  );
  try {
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    const ix = SystemProgram.transfer({
      fromPubkey: fromPublickey,
      toPubkey: potAccount,
      lamports: amount * LAMPORTS_PER_SOL,
    });
    const tx = new Transaction().add(ix);
    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.feePayer = fromPublickey;
    // retrun the tx
    return tx;
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
