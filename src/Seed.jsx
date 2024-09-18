import React, { useState } from 'react';
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js'; 
import { ethers } from 'ethers'; // For Ethereum wallet generation

function Seed() {
  const [mnemonic, setMnemonic] = useState(generateMnemonic());
  const seed = mnemonicToSeedSync(mnemonic);

  const [count, setCount] = useState(0); 
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [solWallets, setSolWallets] = useState([]);
  const [ethWallets, setEthWallets] = useState([]);

  const incrementCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const forSolana = () => {
    const path = `m/44'/501'/${count}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

    const solWallet = {
      path,
      derivedSeed: derivedSeed.toString('hex'),
      secretKey: Buffer.from(secret).toString('hex').slice(0, 4) + '...', 
      publicKey: publicKey
    };

    setSolWallets((prevWallets) => [...prevWallets, solWallet]);

    incrementCounter(); 
  };

  const forEth = () => {
    const path = `m/44'/60'/${count}'/0/0`; // Standard BIP44 Ethereum derivation path
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic); // Use the mnemonic for seed
    const ethWallet = hdNode.derivePath(path);

    const ethWalletData = {
        path,
        secretKey: ethWallet.privateKey.slice(0, 6) + '...', // Display first 6 characters of secret key
        publicKey: ethWallet.address
    };

    setEthWallets((prevWallets) => [...prevWallets, ethWalletData]);

    incrementCounter();
  }

  const toggleMnemonic = () => {
    setShowMnemonic((prevShow) => !prevShow);
  };

  const clearWallets = () => {
    setSolWallets([]);
    setEthWallets([]);
  };

  return (
    <div className="p-6">
      {/* Toggle Mnemonic Button */}
      <div className="flex items-center justify-center m-4">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2"
          onClick={toggleMnemonic}
        >
          Seed Phrase
        </button>
      </div>

      {/* Display Mnemonic */}
      {showMnemonic && (
        <div className="grid grid-cols-4 gap-3 bg-slate-600 p-10 rounded-md">
          {mnemonic.split(' ').map((word, index) => (
            <div
              key={index}
              className="text-white text-center text-xl bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 mb-2"
            >
              {word}
            </div>
          ))}
        </div>
      )}

      {/* Solana Wallets */}
      <div className="bg-slate-700 p-4 mt-6 rounded-md">
        <div className="flex justify-between m-10">
          <h2 className="text-white text-2xl font-medium">Solana Wallets</h2>
          <div>
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-3"
              onClick={forSolana}
            >
              Add Wallet
            </button>
            <button
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              onClick={clearWallets}
            >
              Clear Wallets
            </button>
          </div>
        </div>

        {/* Display All Generated Solana Wallets */}
        {solWallets.length > 0 && (
          <div className="mt-4">
            {solWallets.map((wallet, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 mb-4 rounded-lg text-white"
              >
                <h3 className="text-lg font-semibold">Wallet {index + 1}</h3>
                <p>
                  <strong>Public Key:</strong> {wallet.publicKey}
                </p>
                <p>
                  <strong>Secret Key:</strong> {wallet.secretKey}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ethereum Wallets */}
      <div className="bg-slate-700 p-4 mt-6 rounded-md">
        <div className="flex justify-between m-10">
          <h2 className="text-white text-2xl font-medium">Ethereum Wallets</h2>
          <div>
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-3"
              onClick={forEth}
            >
              Add Wallet
            </button>
            <button
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              onClick={clearWallets}
            >
              Clear Wallets
            </button>
          </div>
        </div>

        {/* Display All Generated Ethereum Wallets */}
        {ethWallets.length > 0 && (
          <div className="mt-4">
            {ethWallets.map((wallet, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 mb-4 rounded-lg text-white"
              >
                <h3 className="text-lg font-semibold">Wallet {index + 1}</h3>
                <p>
                  <strong>Public Key:</strong> {wallet.publicKey}
                </p>
                <p>
                  <strong>Secret Key:</strong> {wallet.secretKey}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Seed;
