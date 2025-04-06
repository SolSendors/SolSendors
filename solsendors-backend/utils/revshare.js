// revShare.js
import cron from 'node-cron';

const TOTAL_SOL_REWARDS = 100;
const MIN_HOLDING = 200_000;

function mockGetSENDORHolders() {
  const holders = [];
  for (let i = 1; i <= 1000; i++) {
    const balance = Math.floor(Math.random() * 20_000_000) + 100_000;
    holders.push({ wallet: `Wallet_${i}`, balance });
  }
  return holders;
}

export function runRevShare() {
  console.log('🔄 Running RevShare distribution...');
  const holders = mockGetSENDORHolders();
  const eligible = holders.filter((h) => h.balance >= MIN_HOLDING);
  const totalEligibleSupply = eligible.reduce((sum, h) => sum + h.balance, 0);

  console.log(`👥 Eligible Holders: ${eligible.length}`);
  console.log(`📊 Total Eligible $SENDOR: ${totalEligibleSupply.toLocaleString()}`);

  eligible.forEach((h) => {
    const share = (h.balance / totalEligibleSupply) * TOTAL_SOL_REWARDS;
    console.log(`💰 ${h.wallet} gets ${share.toFixed(4)} SOL`);
  });

  console.log('✅ RevShare cycle complete.\n');
}

export function scheduleRevShare() {
  cron.schedule('0 0 */3 * *', () => {
    runRevShare();
  });
}
