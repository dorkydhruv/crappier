import { connection, PROGRAM_ID } from "@/constants/const";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";

export function getPotBalance(email: string) {
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const [potAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("pot"), Buffer.from(email)],
      PROGRAM_ID
    );
    connection.getBalance(potAccount).then((balance) => {
      setBalance(balance / LAMPORTS_PER_SOL);
      setLoading(false);
    });
  }, [email, balance]);
  return { balance, balanceLoading };
}
