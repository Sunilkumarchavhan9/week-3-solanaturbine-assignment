import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("FCPPF78HLaFvRVYLoabbUnFXQefcVGHzMFvgKJWvqGh1");

// Recipient address
const to = new PublicKey("7YvBgi2XRxhh1TzqRcCwnggEJ1EXFsDk3tEGrWaVvd6g");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ata = await  getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const  toWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )

        // Transfer the new token to the "toTokenAccount" we just created

        const tx = await transfer(
            connection,
            keypair,
            ata.address,
            toWallet.address,
            keypair,
            2e6
        )

        console.log("yaaa hooo :",{tx})
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();


// yaaa hooo : {
//   tx: 'HsYec1pKxSpZN1z9nvzRsAY4tfWsLFakK8QbNSUVuM9Ygja6QtEbZTJrDQWSoCCGTYyMcSzMm35dp8C59U2TSxH'
// }