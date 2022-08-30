import React from "react";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://rinkeby.infura.io/v3/4e6804ffa40045d0a67d2efccb6cf82e`,
  appName: "Web3-react Demo",
  supportedChainIds: [4],
});

const WalletConnect = new WalletConnectConnector({
  rpc: { 4: "https://rinkeby.infura.io/v3/4e6804ffa40045d0a67d2efccb6cf82e" },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const Navbar = () => {
  const { activate, deactivate, account } = useWeb3React();

  return (
    <div className="bg-pink-200 mx-10 py-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">WhiteList</h1>

      <div
        className="border-2 border-gray-100 py-2 px-6 rounded-full shadow-md relative"
        onClick={() => {
          activate(Injected);
        }}
      >
       { account ? account.slice(0,15)+ '...' :  'Connect Wallet' } 
       { account ? <span className="absolute top-8 right-0 bg-black rounded-full text-white p-2 ease-in-out duration-300 disconnect" onClick={deactivate} > disconnect </span> : ''}
      </div>
    </div>
  );
};

export default Navbar;
