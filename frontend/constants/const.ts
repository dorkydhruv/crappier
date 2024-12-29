import {  Connection, PublicKey } from "@solana/web3.js";
export const GITHUB_URL = "https://github.com/dorkydhruv/crappier";
export const connection = new Connection(
  "https://dawn-broken-putty.solana-devnet.quiknode.pro/54b907b683c741f54a33c70d4df3d7d75e404aa3"
);
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);

export const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const WORKER = process.env.NEXT_PUBLIC_WORKER;
