import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

// Function to add a new mapping

export async function addOrUpdateMapping(
  fid: number,
  starknetAddress: string
): Promise<void> {
  const client = await pool.connect();
  try {
    const existingMapping = await getMappingByFid(fid);
    if (existingMapping) {
      await client.query(
        "UPDATE public.user_mappings SET starknet_address = $1 WHERE fid = $2",
        [starknetAddress, fid]
      );
      console.log("updating mapping fid: " + fid + " starknetAddress: " + starknetAddress)
    } else {
      await client.query(
        "INSERT INTO public.user_mappings (fid, starknet_address) VALUES ($1, $2)",
        [fid, starknetAddress]
      );
      console.log("inserting new mapping fid: " + fid + " starknetAddress: " + starknetAddress)
    }
  } finally {
    client.release();
  }
}

// Function to get a Starknet address by Farcaster ID
export async function getMappingByFid(fid: number): Promise<string | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT starknet_address FROM public.user_mappings WHERE fid = $1",
      [fid]
    );
    console.log("trying to get mapping of fid: ", fid)
    return res.rows[0]?.starknet_address || null;
  } finally {
    client.release();
  }
}

// Function to get a Farcaster ID by Starknet address
export async function getMappingByStarknetAddress(
  starknetAddress: string
): Promise<number | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT fid FROM public.user_mappings WHERE starknet_address = $1",
      [starknetAddress]
    );
    console.log("trying to get mapping of starknet address: ", starknetAddress)
    return res.rows[0]?.fid || null;
  } finally {
    client.release();
  }
}
