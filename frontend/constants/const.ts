import {  Connection, PublicKey } from "@solana/web3.js";
export const GITHUB_URL = "https://github.com/dorkydhruv/crappier";
export const connection = new Connection(
  "https://thrilling-methodical-brook.solana-devnet.quiknode.pro/dd7c4e3b8a51ab3c1a229f287a30db024e12a6d2"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);

export const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const WORKER = process.env.NEXT_PUBLIC_WORKER;
