import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

import '@solana/wallet-adapter-react-ui/styles.css'; // ✅ Proper import

// SolSendors Logo (Click to go back to home page)
const SolSendorsLogo = () => (
  <Link to="/" className="text-purple-500 text-2xl font-bold flex items-center gap-2 animate-pulse">
    <span>🚀</span>
    <span className="tracking-wide drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]">SolSendors</span>
  </Link>
);

// LandingPage Component (Main Page with Graphics, Animation, and Button)
const LandingPage = () => (
  <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
    <Particles
      id="tsparticles"
      init={async (engine) => await loadSlim(engine)}
      options={{
        fullScreen: { enable: true },
        background: { color: 'transparent' },
        particles: {
          color: { value: '#a855f7' },
          number: { value: 100 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 0.5 },
          links: { enable: true, color: '#9333ea' },
          opacity: { value: 0.6 },
        },
      }}
      className="absolute inset-0 z-0"
    />
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-purple-700 opacity-30 rounded-full blur-3xl top-0 left-1/4"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-2xl bottom-20 right-1/4"></div>
      <div className="absolute w-[450px] h-[450px] bg-purple-600 opacity-25 rounded-full blur-3xl top-1/3 right-1/3"></div>
      <svg className="absolute w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          points="33,0 36,20 30,20 33,40"
          stroke="#a855f7"
          strokeWidth="3"
          fill="none"
          className="absolute left-1/3"
          style={{ filter: 'drop-shadow(rgb(168,85,247) 0px 0px 10px)' }}
        />
        <polyline
          points="33,0 36,20 30,20 33,40"
          stroke="#9333ea"
          strokeWidth="3"
          fill="none"
          className="absolute left-2/3"
          style={{ filter: 'drop-shadow(rgb(147,51,234) 0px 0px 15px)' }}
        />
      </svg>
    </div>

    <header className="py-6 px-6 flex items-center justify-between border-b border-purple-800 relative z-10">
      <SolSendorsLogo />
      <nav className="space-x-6 text-sm text-white">
        <a href="#" className="hover:text-purple-400 transition duration-300">Features</a>
        <a href="#" className="hover:text-purple-400 transition duration-300">Leaderboard</a>
        <a href="#" className="hover:text-purple-400 transition duration-300">Community</a>
      </nav>
      <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium ml-4 transition transform hover:scale-105 shadow-md">
        Connect Wallet
      </button>
    </header>

    <main className="relative w-full flex flex-col items-center justify-center text-center py-28 px-6 z-10">
      <h1 className="text-5xl sm:text-7xl font-extrabold text-purple-400 mb-6 leading-tight max-w-4xl drop-shadow-[0_0_20px_rgba(168,85,247,0.95)] animate-pulse">
        THE FUTURE OF SOLANA TOKEN CREATION
      </h1>
      <Link to="/create-token">
        <motion.button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full text-xl shadow-lg transition mb-20 animate-bounce">
          CREATE YOUR SOLANA TOKEN
        </motion.button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-24">
        <div className="bg-zinc-900 border border-purple-800 p-8 rounded-xl shadow-lg text-center hover:shadow-purple-700 transition transform hover:rotate-1">
          <div className="text-purple-500 text-4xl mb-3 animate-bounce">🛡️</div>
          <h3 className="text-xl font-bold mb-2 text-purple-300">Safe and Secure</h3>
          <p className="text-gray-400 text-sm">KYC is required before token creation, keeping investors protected.</p>
        </div>
        <div className="bg-zinc-900 border border-purple-800 p-8 rounded-xl shadow-lg text-center hover:shadow-purple-700 transition transform hover:rotate-1">
          <div className="text-purple-500 text-4xl mb-3 animate-bounce">🪪</div>
          <h3 className="text-xl font-bold mb-2 text-purple-300">KYC-Backed Tokens</h3>
          <p className="text-gray-400 text-sm">Every token is permanently tied to a verified creator ID.</p>
        </div>
        <div className="bg-zinc-900 border border-purple-800 p-8 rounded-xl shadow-lg text-center hover:shadow-purple-700 transition transform hover:rotate-1">
          <div className="text-purple-500 text-4xl mb-3 animate-bounce">💰</div>
          <h3 className="text-xl font-bold mb-2 text-purple-300">Tax & RevShare</h3>
          <p className="text-gray-400 text-sm">Enable automated tax and revenue distribution in SOL.</p>
        </div>
      </div>
    </main>

    <footer className="py-6 text-center border-t border-purple-800 text-sm text-gray-500 relative z-10">
      © 2025 SolSendors. All rights reserved.
    </footer>
  </div>
);

// Token Creation Form Page
const CreateTokenForm = ({ publicKey, connected, disconnect, setVisible }) => {
  const [enableTax, setEnableTax] = useState(false);
  const [enableRevShare, setEnableRevShare] = useState(false);
  const [firstBuy, setFirstBuy] = useState(false);
  const [firstBuyAmount, setFirstBuyAmount] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [status, setStatus] = useState('');
  const [formFields, setFormFields] = useState({
    tokenName: '',
    symbol: '',
    supply: '',
    lpChoice: 'Raydium',
    liquidityOption: 'lock',
  });

  useEffect(() => {
    const { tokenName, symbol, supply, lpChoice, liquidityOption } = formFields;
    const filled = tokenName && symbol && supply && lpChoice && liquidityOption;
    setFormValid(connected && filled);
  }, [formFields, connected]);

  const handleCreateToken = async (e) => {
    e.preventDefault();

    const tokenData = {
      ...formFields,
      walletAddress: publicKey?.toBase58(),
      enableTax: enableTax.toString(),
      enableRevShare: enableRevShare.toString(),
      firstBuy: firstBuy.toString(),
      firstBuyAmount,
    };

    try {
      const res = await fetch('http://localhost:5000/api/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenData),
      });

      const data = await res.json();
      setStatus(data.message || data.error || 'Token created.');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error creating token.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 relative">
      <header className="relative z-10 flex justify-between items-center mb-10">
        <SolSendorsLogo />
        <div className="space-x-3 flex items-center">
          {connected && publicKey && (
            <p className="text-sm text-green-400 font-mono mr-2">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </p>
          )}
          {!connected ? (
            <motion.button onClick={() => setVisible(true)} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
              Connect Wallet
            </motion.button>
          ) : (
            <motion.button onClick={disconnect} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
              Disconnect
            </motion.button>
          )}
        </div>
      </header>

      <section className="relative z-10 text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">Create Your Token</h2>
        <p className="text-green-400 font-medium mb-4">{status}</p>
      </section>

      <form onSubmit={handleCreateToken} className="relative z-10 max-w-xl mx-auto bg-zinc-900 p-6 rounded-lg border border-purple-800 space-y-4">
        <input
          type="text"
          placeholder="Token Name"
          value={formFields.tokenName}
          onChange={(e) => setFormFields({ ...formFields, tokenName: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
          required
        />
        <input
          type="text"
          placeholder="Symbol"
          value={formFields.symbol}
          onChange={(e) => setFormFields({ ...formFields, symbol: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
          required
        />
        <input
          type="number"
          placeholder="Total Supply"
          value={formFields.supply}
          onChange={(e) => setFormFields({ ...formFields, supply: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
          required
        />
        <select
          value={formFields.lpChoice}
          onChange={(e) => setFormFields({ ...formFields, lpChoice: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
        >
          <option value="Raydium">Raydium LP</option>
          <option value="Jupiter">Jupiter LP</option>
        </select>
        <select
          value={formFields.liquidityOption}
          onChange={(e) => setFormFields({ ...formFields, liquidityOption: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
        >
          <option value="lock">Lock Liquidity (3 months)</option>
          <option value="burn">Burn Liquidity</option>
        </select>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={enableTax} onChange={(e) => setEnableTax(e.target.checked)} />
            Enable Tax
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={enableRevShare} onChange={(e) => setEnableRevShare(e.target.checked)} />
            Enable Rev Share
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={firstBuy} onChange={(e) => setFirstBuy(e.target.checked)} />
            First Buy
          </label>
          {firstBuy && (
            <input
              type="number"
              step="0.01"
              placeholder="SOL Amount"
              value={firstBuyAmount}
              onChange={(e) => setFirstBuyAmount(e.target.value)}
              className="w-full p-2 bg-zinc-800 rounded text-white"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={!formValid}
          className="w-full bg-purple-600 py-3 rounded text-white hover:bg-purple-700 disabled:opacity-50"
        >
          Deploy Token
        </button>
      </form>

      <footer className="relative z-10 py-6 text-center border-t border-purple-800 text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} SolSendors. All rights reserved.
      </footer>
    </div>
  );
};

export default function App() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <Router>
      <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
        <WalletProvider wallets={[new PhantomWalletAdapter(), new SolflareWalletAdapter()]} autoConnect>
          <WalletModalProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create-token" element={<CreateTokenForm publicKey={publicKey} connected={connected} disconnect={disconnect} setVisible={setVisible} />} />
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}
