import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export const Header = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();

  return (
    <div className="flex flex-row">
      <h1 className="text-3xl font-bold">Flippy!</h1>
      <ConnectButton moralisAuth={true} />
    </div>
  );
};
