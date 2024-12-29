import { JsonObject, Public } from "@prisma/client/runtime/library";
import { parser } from "./parser";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection, PROGRAM_ID } from "../../const";
import { AnchorProvider, BN, Idl, Program, Wallet } from "@coral-xyz/anchor";
import idl from "../../idl.json";
import { insufficientBalanceEmail } from "./insufficientBalanceEmail";
export async function solanaWorker(
  payload: any,
  metadata: JsonObject,
  email: string
) {
  const amount = metadata.amount;
  const publicKey = metadata.publicKey;
  const parsedAmount = parser(amount?.toString() ?? "", payload);
  const parsedTo = parser(publicKey?.toString() ?? "", payload);
  console.log(
    "Sending Solana publicKey ",
    parsedTo,
    " with amount ",
    parsedAmount
  );
  const [potAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("pot"), Buffer.from(email)],
    PROGRAM_ID
  );
  const potBalance = await connection.getBalance(potAccount);
  if (potBalance < Number(parsedAmount) * LAMPORTS_PER_SOL) {
    console.log("Insufficient balance");
    // Send email to user that the balance is insufficient
    await insufficientBalanceEmail(payload, email);
    return false;
  }

  try {
    const secretKeyArray = JSON.parse(process.env.ANCHOR_PRIVATE_KEY as string);
    if (!Array.isArray(secretKeyArray) || secretKeyArray.length !== 64) {
      throw new Error("Invalid secret key");
    }
    const secretKey = Uint8Array.from(secretKeyArray);
    const keypair = Keypair.fromSecretKey(secretKey);
    const provider = new AnchorProvider(connection, new Wallet(keypair));
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
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
