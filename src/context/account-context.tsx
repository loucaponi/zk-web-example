"use client";

import { WSS_URL } from "@/constants";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AccountContextState = {
  connectedAccount?: InjectedAccountWithMeta;
  api?: ApiPromise;
  handleConnectWallet: () => Promise<void>;
};

const AccountContext = createContext<AccountContextState>({
  handleConnectWallet: () => Promise.resolve(),
});

export function useAccountContext() {
  return useContext(AccountContext);
}

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [api, setApi] = useState<ApiPromise>();
  const [connectedAccount, setConnectedAccount] =
    useState<InjectedAccountWithMeta>();

  const setup = useCallback(async () => {
    const wsProvider = new WsProvider(WSS_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    setApi(api);
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  const handleConnectWallet = useCallback(async () => {
    const extensions = await web3Enable("Factorization App");

    if (!extensions) {
      throw new Error("No extension found");
    }

    const allAccounts = await web3Accounts();

    // For now, select first available account
    // More robust apps would allow selecting which account to connect
    setConnectedAccount(allAccounts[0]);
  }, []);

  return (
    <AccountContext.Provider
      value={{ api, connectedAccount, handleConnectWallet }}
    >
      {children}
    </AccountContext.Provider>
  );
}
