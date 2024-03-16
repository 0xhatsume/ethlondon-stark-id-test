import { useLocalStorage } from "@uidotdev/usehooks";

interface IfidStarkAddressMapping {
    [key: number]: string;
}

// Function to add a new mapping

export async function addOrUpdateMapping(fid: number,
starknetAddress: string
): Promise<void> {
    const fidStarkAddressMapping:IfidStarkAddressMapping = JSON.parse(localStorage?.getItem("fid-starkaddress") || "{}")
    fidStarkAddressMapping[fid] = starknetAddress
}


// Function to get a Starknet address by Farcaster ID
export async function getMappingByFid(fid: number): Promise<string | null> {

    const fidStarkAddressMapping:IfidStarkAddressMapping = JSON.parse(localStorage?.getItem("fid-starkaddress") || "{}")

    return fidStarkAddressMapping[fid] || null
}


// Function to get a Farcaster ID by Starknet address
export async function getMappingByStarknetAddress(
    starknetAddress: string
): Promise<number | null> {
    const fidStarkAddressMapping:IfidStarkAddressMapping = JSON.parse(localStorage?.getItem("fid-starkaddress") || "{}")
    
    return parseInt(Object.keys(fidStarkAddressMapping).find(fid =>
        fidStarkAddressMapping[parseInt(fid)] === starknetAddress) ?? "") || null

    // for (const [key, value] of fidStarkAddressMapping) {
    //     if (value === starknetAddress) {
    //         return key
    //     }
    // }
}

