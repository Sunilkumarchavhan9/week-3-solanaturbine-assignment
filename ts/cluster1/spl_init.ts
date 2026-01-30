import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file (wallet is a numeric array in JSON)
let keypair: Keypair;
try {
    keypair = Keypair.fromSecretKey(Uint8Array.from(wallet as number[]));
} catch (err) {
    console.warn('Imported wallet is invalid or empty — using a generated temporary keypair for this run');
    keypair = Keypair.generate();
}

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
         const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6,
        )
        console.log(`successfully created  a mint ${mint}`)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


//pubkey = CAQpbJn4VAy4ooTL8MqbUSGGXD7yJkt6CkC6DnaXLyuj
//  solana balance =  CAQpbJn4VAy4ooTL8MqbUSGGXD7yJkt6CkC6DnaXLyuj -> 5 SOL
// mint =  FCPPF78HLaFvRVYLoabbUnFXQefcVGHzMFvgKJWvqGh1