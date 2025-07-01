"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import { Button } from "./ui/button";
import Star8 from "./stars/s8";

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
      className="absolute cursor-pointer truncate z-10 font-black items-center justify-center text-[1rem] w-[12rem] top-4  md:top-8 md:right-22 right-1 mr-2"
      onClick={handleClick}
      disabled={connecting}
    >
      {connected && publicKey
        ? `${publicKey.toBase58().slice(0, 1)}..${publicKey
            .toBase58()
            .slice(-1)} (Disconnect)`
        : connecting
        ? "Connecting..."
        : "Connect Wallet"}
      <Star8
        fill="#DBCAF4"
        stroke="#000"
        strokeWidth={10}
        className="!w-6 text-[#DBCAF4]  !h-6"
      />
    </Button>
  );
}
