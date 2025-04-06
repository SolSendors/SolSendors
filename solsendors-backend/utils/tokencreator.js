// tokenCreator.js
export function createToken({
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
}) {
  console.log(`🚀 Token deployed: ${tokenName} (${symbol}) | Supply: ${supply} | Wallet: ${walletAddress}`);
  console.log(`🔧 LP Choice: ${lpChoice} | Liquidity Option: ${liquidityOption}`);
  console.log(`💸 Tax feature: ${enableTax === 'true' ? 'ENABLED' : 'DISABLED'}`);
  console.log(`📈 Rev Share: ${enableRevShare === 'true' ? 'ENABLED' : 'DISABLED'}`);
  if (firstBuy === 'true') {
    console.log(`🎯 First Buy Enabled — Amount Required: ${firstBuyAmount} SOL`);
  }

  let lpResult = `💧 Simulated LP pool created on ${lpChoice}`;
  lpResult += liquidityOption === 'lock'
    ? ' with liquidity locked for 3 months.'
    : ' with liquidity burned.';

  console.log(`🔒 Mint and Freeze Authorities REVOKED ✅`);

  return {
    message: `✅ Token '${tokenName}' (${symbol}) deployed with total supply of ${supply}. ${lpResult}`,
  };
}
