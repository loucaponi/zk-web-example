"use client";

import { BLOCK_EXPLORER_BASE_URL, MOCK_FFLONK_PROOF } from "@/constants";
import { useAccountContext } from "@/context/account-context";
import { Button, Link, ScrollShadow } from "@nextui-org/react";
import { useCallback, useState } from "react";

type Props = {
  mockProof: string;
  proofType: "Fflonk" | "Boojum";
  pallet: "settlementFFlonkPallet" | "settlementZksyncPallet";
};

export default function BasicProof({ mockProof, proofType, pallet }: Props) {
  const { connectedAccount, api, handleConnectWallet } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [blockHash, setBlockHash] = useState("");

  const submitProof = useCallback(async () => {
    if (!api || !connectedAccount) {
      return;
    }

    // Rely on a dynamic import to fix build issue
    const { web3FromAddress } = await import("@polkadot/extension-dapp");

    const injector = await web3FromAddress(connectedAccount.address);
    setBlockHash("");
    setLoading(true);

    const unsub = await api?.tx[pallet].submitProof(mockProof).signAndSend(
      connectedAccount.address,
      {
        signer: injector.signer,
      },
      ({ status, events, dispatchError }) => {
        console.log(`Current status is ${status}`);

        if (status.isInBlock) {
          console.log(`Transaction included at blockHash ${status.asInBlock}`);
        } else if (status.isFinalized) {
          console.log(
            `Transaction finalized at blockHash ${status.asFinalized}`
          );
          setLoading(false);
          setBlockHash(status.asFinalized.toString());
          unsub();
        }
      }
    );

    return unsub;
  }, [api, connectedAccount, mockProof, pallet]);

  return (
    <div className="w-full">
      <h1 className="text-large font-bold mb-2">Submit {proofType} Proof</h1>
      <ScrollShadow className="w-[600px] h-[400px] break-all">
        {mockProof}
      </ScrollShadow>

      <Button
        onClick={connectedAccount ? submitProof : handleConnectWallet}
        type="button"
        className=" bg-emerald-400 mt-3"
        isDisabled={loading}
        isLoading={loading}
      >
        {connectedAccount ? "Submit Proof" : "Connect Wallet"}
      </Button>
      {!loading && blockHash && (
        <div className="mt-2">
          Proof Verified! Tx included in block.{" "}
          <Link
            target="_blank"
            href={`${BLOCK_EXPLORER_BASE_URL}/v0/block/${blockHash}`}
          >
            View on Block Explorer
          </Link>
        </div>
      )}
    </div>
  );
}
