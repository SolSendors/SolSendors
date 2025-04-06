import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import { Connection, clusterApiUrl } from '@solana/web3.js'; // Added

const app = express();
const PORT = 5000;
const TOTAL_SOL_REWARDS = 100;
const MIN_HOLDING = 200_000;

// ✅ Use Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Health check
app.get('/', (req, res) => {
  res.send('✅ SolSendors backend is running on DEVNET');
});

// Token creation + LP mock endpoint
app.post('/api/create-token', (req, res) => {
  console.log('🔥 /api/create-token HIT');

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

    const connectedWallet = req.headers['x-wallet-address'];
    const walletType = req.headers['x-wallet-type'];

    if (
      !tokenName || !symbol || !supply ||
      !walletAddress || !lpChoice || !liquidityOption
    ) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`🚀 Token deployed: ${tokenName} (${symbol}) | Supply: ${supply} | Wallet: ${walletAddress}`);
    console.log(`🔧 LP Choice: ${lpChoice} | Liquidity Option: ${liquidityOption}`);
    console.log(`💸 Tax feature: ${enableTax === 'true' ? 'ENABLED' : 'DISABLED'}`);
    console.log(`📈 Rev Share: ${enableRevShare === 'true' ? 'ENABLED' : 'DISABLED'}`);
    if (firstBuy === 'true') {
      console.log(`🎯 First Buy Enabled — Amount Required: ${firstBuyAmount} SOL`);
    }

    if (isKYCVerified !== true && isKYCVerified !== 'true') {
      console.log(`⚠️ WARNING: Token is NOT KYC VERIFIED. This is considered HIGH RISK.`);
    }

    if (connectedWallet && walletType) {
      console.log(`🔗 Connected Wallet: ${connectedWallet} via ${walletType}`);
    }

    // Simulated authority revocations
    console.log('🔐 Mint authority revoked ✅');
    console.log('🧊 Freeze authority revoked ✅');

    let lpResult = `💧 Simulated LP pool created on ${lpChoice}`;
    lpResult += liquidityOption === 'lock'
      ? ' with liquidity locked for 3 months.'
      : ' with liquidity burned.';

    return res.json({
      message: `✅ Token '${tokenName}' (${symbol}) deployed with total supply of ${supply}. ${lpResult}`,
    });
  } catch (err) {
    console.error('❌ Error in /api/create-token:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ----------- 🧠 REV SHARE AUTOMATION (Mock Logic) -----------

function mockGetSENDORHolders() {
  const holders = [];
  for (let i = 1; i <= 1000; i++) {
    const balance = Math.floor(Math.random() * 20_000_000) + 100_000;
    holders.push({ wallet: `Wallet_${i}`, balance });
  }
  return holders;
}

function runRevShare() {
  console.log('🔄 Running RevShare distribution...');

  const holders = mockGetSENDORHolders();
  const eligible = holders.filter((h) => h.balance >= MIN_HOLDING);
  const totalEligible = eligible.reduce((sum, h) => sum + h.balance, 0);

  console.log(`👥 Eligible Holders: ${eligible.length}`);
  console.log(`📊 Total Eligible $SENDOR: ${totalEligible.toLocaleString()}`);

  eligible.forEach((h) => {
    const share = (h.balance / totalEligible) * TOTAL_SOL_REWARDS;
    console.log(`💰 ${h.wallet} gets ${share.toFixed(4)} SOL`);
  });

  console.log('✅ RevShare cycle complete.\n');
}

// Run every 3 days (midnight)
cron.schedule('0 0 */3 * *', () => {
  runRevShare();
});

// Test run
runRevShare();

// Catch-all
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend listening on all interfaces at http://localhost:${PORT}`);
});
