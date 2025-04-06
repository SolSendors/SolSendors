import { createToken } from '../utils/tokenCreator.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      tokenName,
      symbol,
      supply,
      walletAddress,
      enableTax,
      enableRevShare,
      firstBuy,
      firstBuyAmount,
      lpChoice,
      liquidityOption,
      isKYCVerified,
    } = req.body;

    if (!tokenName || !symbol || !supply || !walletAddress || !lpChoice || !liquidityOption) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const connectedWallet = req.headers['x-wallet-address'];
    const walletType = req.headers['x-wallet-type'];

    if (connectedWallet && walletType) {
      console.log(`🔗 Connected Wallet: ${connectedWallet} via ${walletType}`);
    }

    if (isKYCVerified !== true && isKYCVerified !== 'true') {
      console.log(`⚠️ WARNING: Token is NOT KYC VERIFIED. This is considered HIGH RISK.`);
    }

    const result = createToken({
      tokenName,
      symbol,
      supply,
      walletAddress,
      enableTax,
      enableRevShare,
      firstBuy,
      firstBuyAmount,
      lpChoice,
      liquidityOption,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('❌ Error in /api/create-token:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
