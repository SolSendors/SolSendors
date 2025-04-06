import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

const app = express();
const verifiedWallets = new Set();
const approvedKYCWallets = new Set();

// Security Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Rate Limit
app.use('/api/', rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: '⏳ Too many requests. Please try again later.',
}));

// CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Signature Middleware
const requireSignature = (req, res, next) => {
  const wallet = req.body.walletAddress;
  if (!wallet || !verifiedWallets.has(wallet)) {
    return res.status(403).json({ error: '🔐 Wallet not verified.' });
  }
  next();
};

// Verify Signature Endpoint
app.post('/api/verify-signature', (req, res) => {
  const { walletAddress, message, signature } = req.body;
  if (!walletAddress || !message || !signature) {
    return res.status(400).json({ error: '❌ Missing fields.' });
  }

  try {
    const isValid = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(signature),
      bs58.decode(walletAddress)
    );

    if (!isValid) {
      return res.status(401).json({ error: '❌ Invalid signature.' });
    }

    verifiedWallets.add(walletAddress);
    return res.status(200).json({ success: true, message: '✅ Signature verified.' });
  } catch (err) {
    return res.status(500).json({ error: '❌ Signature verification failed.', details: err.message });
  }
});

// Approve KYC
app.post('/api/approve-kyc', (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ error: 'Missing wallet address.' });

  approvedKYCWallets.add(walletAddress);
  return res.status(200).json({ message: `✅ KYC approved for ${walletAddress}` });
});

// Create Token (Mock)
app.post('/api/create-token', requireSignature, (req, res) => {
  try {
    const {
      tokenName,
      symbol,
      supply,
      walletAddress,
      lpChoice,
      liquidityOption,
      enableTax,
      enableRevShare,
      firstBuy,
      firstBuyAmount
    } = req.body;

    if (!tokenName || !symbol || !supply || !walletAddress || !lpChoice || !liquidityOption) {
      return res.status(400).json({ error: '❌ Missing required fields.' });
    }

    const mockTokenAddress = `So1${Math.random().toString(36).substring(2, 12)}DoR`;
    const mockLpUrl = `https://dexscreener.com/solana/${mockTokenAddress}`;

    let mockFirstBuyStatus = '❌ Skipped';
    if (firstBuy === 'true' && parseFloat(firstBuyAmount) > 0) {
      mockFirstBuyStatus = `💸 Creator will buy with ${firstBuyAmount} SOL`;
    }

    const response = {
      success: true,
      message: `${tokenName} ($${symbol}) created successfully!`,
      tokenAddress: mockTokenAddress,
      lpLink: mockLpUrl,
      liquidity: liquidityOption === 'burn' ? '🔥 Burned' : '🔒 Locked for 3 months',
      features: {
        Tax: enableTax === 'true' ? '✅ Enabled' : '❌ Disabled',
        RevShare: enableRevShare === 'true' ? '✅ Enabled' : '❌ Disabled',
        FirstBuy: mockFirstBuyStatus,
        LP: lpChoice,
      },
    };

    setTimeout(() => {
      return res.status(200).json(response);
    }, 1500);
  } catch (err) {
    return res.status(500).json({ error: '❌ Token creation failed.', details: err.message });
  }
});

// 404 Catch
app.use((req, res) => {
  res.status(404).json({ error: '🚫 Endpoint not found.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
