import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'

import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
   
    <ConnectionProvider endpoint='https://api.devnet.solana.com' >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

          <div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <div className="flex flex-row justify-center mb-4">
                <WalletMultiButton className="btn btn-primary mr-2" />
                <WalletDisconnectButton className="btn btn-secondary" />
              </div>
              <TokenLaunchpad />
            </div>
          </div>

          
        </WalletModalProvider>

      </WalletProvider>



    </ConnectionProvider>
  )
}

export default App
