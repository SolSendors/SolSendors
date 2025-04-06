import {
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
  } from '@solana/web3.js';
  import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
  } from '@solana/spl-token';
  import bs58 from 'bs58';
  
  const RPC_URL = 'https://api.mainnet-beta.solana.com'; // Or use your QuikNode if preferred
  const connection = new Connection(RPC_URL);
  
  export const deployToken = async ({
    name,
    symbol,
    supply,
    decimals,
    payerPrivateKey,
  }) => {
    try {
      const payer = Keypair.fromSecretKey(bs58.decode(payerPrivateKey));
      const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        decimals
      );
  
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
      );
  
      const totalSupply = BigInt(supply) * BigInt(10 ** decimals);
  
      await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        totalSupply
      );
  
      return {
        success: true,
        mintAddress: mint.toBase58(),
        tokenAccount: tokenAccount.address.toBase58(),
      };
    } catch (err) {
      console.error('Token creation error:', err);
      return { success: false, error: err.message };
    }
  };
  