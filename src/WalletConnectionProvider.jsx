import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  WalletConnectWalletAdapter,
  InjectedWalletAdapter, // ✅ Handles Backpack and other browser wallets
} from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

const endpoint = 'https://api.mainnet-beta.solana.com';

export const WalletConnectionProvider = ({ children }) => {
  const wallets = useMemo(
    () => [
      new InjectedWalletAdapter(), // ✅ Supports Backpack, Glow, and other injected wallets
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: 'mainnet' }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: 'mainnet',
        options: {
          relayUrl: 'wss://relay.walletconnect.com',
          projectId: 'solsendors-temp-project-id', // 🔁 Replace with your actual WalletConnect v2 project ID if needed
          metadata: {
            name: 'SolSendors',
            description: 'Token launch platform',
            url: 'https://solsendors.app',
            icons: ['https://solsendors.app/icon.png'],
          },
        },
      }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
