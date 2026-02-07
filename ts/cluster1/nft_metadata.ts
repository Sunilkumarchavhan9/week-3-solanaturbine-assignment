import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address : "https://devnet.irys.xyz"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/3kzC16W1ndwN3Qp31NiAUgDVkmUxHcDz9WX8t5Hwswvk"
        const metadata = {
            name: "jinx",
            symbol: "JiNx-rug",
            description: "13 colored neaon rug",
            image: image,
            attributes: [
                {trait_type: 'pink neaon', value: '13'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// {"name":"jinx","symbol":"JiNx-rug","description":"13 colored neaon rug","image":"image","attributes":[{"trait_type":"pink neaon","value":"13"}],"properties":{"files":[{"type":"image/png","uri":"https://gateway.irys.xyz/6hg7qkd6Ndy5ctUvEuaq8nGq5hayRYD6qXaao4BUPtt4"}]},"creators":[]}
// Your metadata URI:  https://gateway.irys.xyz/9oexN4rDeZ3cNP2erxyT21m4mvEUvavL1t483p1BVapA