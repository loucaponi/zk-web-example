"use client";

import { BLOCK_EXPLORER_BASE_URL } from "@/constants";
import useExtrinsic from "@/hooks/use-extrinsic";
import { useZKV } from "@/providers/zkv-provider";
import { Button, Link } from "@nextui-org/react";
import CodeDisplay from "./code-display";

type Props = {
  mockProof: string;
  vKey?: string;
};

export default function FflonkProof({ mockProof, vKey }: Props) {
  const { connectedAccount } = useZKV();

  const {
    exec: submitProof,
    status,
    errorText,
    blockHash,
  } = useExtrinsic({
    pallet: "settlementFFlonkPallet",
    extrinsic: "submitProof",
    args: [mockProof, vKey || null],
  });

  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Fflonk Proof</h1>
      {vKey && (
        <CodeDisplay label="vKey">
          {<pre>{JSON.stringify(vKey, null, 2)}</pre>}
        </CodeDisplay>
      )}

      <CodeDisplay className="h-96" label="Proof">
        {mockProof}
      </CodeDisplay>

      <Button
        onClick={submitProof}
        type="button"
        className=" bg-emerald-400 mt-3"
        isDisabled={status === "loading" || !connectedAccount}
        isLoading={status === "loading"}
      >
        Submit Proof
      </Button>
      {status === "success" && blockHash && (
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
      {status === "error" && errorText && (
        <div className="mt-2 text-red-900">{errorText}</div>
      )}
    </div>
  );
}
