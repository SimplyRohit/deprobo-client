"use client";

import { WalletError } from "@solana/wallet-adapter-base";
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import dynamic from "next/dynamic";
import { ReactNode, useCallback } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { AnchorProvider } from "@coral-xyz/anchor";
import { toast } from "sonner";

// export const WalletButton = dynamic(
//   async () =>
//     (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
//   {
//     ssr: false,
//   }
// );

export function SolanaProvider({ children }: { children: ReactNode }) {
  const onError = useCallback((error: WalletError) => {
    console.log("Error connecting to wallet:", error);
    toast.error(
      `${error.message === "" ? "wallet Not connected" : error.message}`
    );
  }, []);

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_ENDPOINT!}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();
  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  });
}
