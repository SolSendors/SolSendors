import React, { useEffect, useState, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  WalletConnectWalletAdapter
} from '@solana/wallet-adapter-wallets';

import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles

const endpoint = clusterApiUrl('mainnet-beta');

const wallets = [
  new PhantomWalletAdapter(),
  new BackpackWalletAdapter(),
  new WalletConnectWalletAdapter({
    network: 'mainnet-beta',
    options: {
      projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Optional, can be left out for default
      relayUrl: 'wss://relay.walletconnect.com'
    }
  })
];

function WalletStatus() {
  const { publicKey, connected } = useWallet();
  const [shortAddress, setShortAddress] = useState('');

  useEffect(() => {
    if (publicKey) {
      const addr = publicKey.toString();
      setShortAddress(`${addr.slice(0, 4)}...${addr.slice(-4)}`);
    } else {
      setShortAddress('');
    }
  }, [publicKey]);

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <div className="wallet-status">
          <span className="wallet-connected">Connected</span>
          <span className="text-sm text-white font-mono">{shortAddress}</span>
          <Wallet
