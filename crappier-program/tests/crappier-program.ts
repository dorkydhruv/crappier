import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CrappierProgram } from "../target/types/crappier_program";

describe("crappier-program", async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet;
  const program = anchor.workspace.CrappierProgram as Program<CrappierProgram>;
  const [potAccount, potBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("pot"), Buffer.from("email")],
    program.programId
  );
  console.log("Pot account: ", potAccount.toBase58());
  console.log("Pot bump: ", potBump);
  console.log("Wallet account: ", wallet.publicKey.toBase58());
  it("fund the pot", async () => {
    try {
      const { blockhash, lastValidBlockHeight } =
        await provider.connection.getLatestBlockhash();
      const ix = anchor.web3.SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: potAccount,
        lamports: 1 * anchor.web3.LAMPORTS_PER_SOL,
      });
      const tx = new anchor.web3.Transaction().add(ix);
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = wallet.publicKey;
      // Sign and send the transaction
      const txSigned = await wallet.signTransaction(tx);
      const txId = await provider.connection.sendRawTransaction(
        txSigned.serialize()
      );
      console.log(txId);
      // Wait for transaction confirmation
      await provider.connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: txId,
      });
      
      console.log(
        (await provider.connection.getBalance(potAccount)) /
          anchor.web3.LAMPORTS_PER_SOL
      );
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  });

  it("withdraw from the pot", async () => {
    const tx = await program.methods
      .transferSolToAccount(
        "email",
        new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL)
      )
      .accounts({
        reciever: wallet.publicKey,
      })
      .rpc();
    console.log(tx);
    console.log(
      (await provider.connection.getBalance(potAccount)) /
        anchor.web3.LAMPORTS_PER_SOL
    );
  });
});
