import {  Connection, PublicKey } from "@solana/web3.js";
export const GITHUB_URL = "https://github.com/dorkydhruv/crappier";
export const connection = new Connection(
  "https://cool-snowy-silence.solana-devnet.quiknode.pro/056b57d6ff0a6ddfc0e2398a332ce5bea67f8985/"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);

export const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const WORKER = process.env.NEXT_PUBLIC_WORKER;
