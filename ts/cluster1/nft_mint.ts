import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint, 
        name: "my awsome rug",
        symbol: "RUG",
        uri: " https://gateway.irys.xyz/9oexN4rDeZ3cNP2erxyT21m4mvEUvavL1t483p1BVapA",
        sellerFeeBasisPoints:percentAmount(5)
    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();


// Succesfully Minted! Check out your TX here:
// https://explorer.solana.com/tx/2x6QNhostKoTvk4sYowLqPnDSymdaSjATGuYEWpJSvmTeDxN81ouqyYaUUdYxjBm3245gxrgDjQaptKoTVLVgpS3?cluster=devnet
// Mint Address:  7zLuJdrFcwyowrmXKmju63ukk2ZcCAsKyEmkqGbD6Mti