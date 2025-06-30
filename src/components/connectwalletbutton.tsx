"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import { Button } from "./ui/button";

export default function ConnectWalletButton() {
  const { connected, connect, disconnect, publicKey, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = useCallback(async () => {
    if (connected) {
      await disconnect();
    } else {
      await setVisible(true);
    }
  }, [connected, connect, disconnect]);
  return (
    <Button
      variant="neutral"
      className="absolute cursor-pointer z-10 font-mono font-black top-8 right-22"
      onClick={handleClick}
      disabled={connecting}
    >
      {connected && publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
            .toBase58()
            .slice(-4)} (Disconnect)`
        : connecting
        ? "Connecting..."
        : "Connect Wallet"}
    </Button>
  );
}
