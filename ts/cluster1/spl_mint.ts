import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("FCPPF78HLaFvRVYLoabbUnFXQefcVGHzMFvgKJWvqGh1");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const amount = await 5n * token_decimals;
         const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, amount);
         console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
// ata is: 718RvkGd6FrxCLdHJ6vkxeN6ETa7gtxQJxDE5o8HqVbp
// mint txid: 2q4P3wQjAjkzZn2bmy9KRykeVxeTh3nX89nvMQ7x3nXMfh1oirNfoywe5VkDz8FNceHBuMiH34TPDniy8HkjMz9D


