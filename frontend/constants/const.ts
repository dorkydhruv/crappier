import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
export const GITHUB_URL = "https://github.com/dorkydhruv/crappier";
export const connection = new Connection(clusterApiUrl("devnet"));
export const PROGRAM_ID = new PublicKey(
  "5TtSuWwcCr5ww4Kef2aYsvT8uF9H1hHGyC7fhsCwAaUx"
);
