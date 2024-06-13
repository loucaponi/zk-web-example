"use client";

import {
  BLOCK_EXPLORER_BASE_URL,
  GROTH16_INPUT,
  GROTH16_VKEY,
  MOCK_GROTH16_PROOF,
} from "@/constants";
import useExtrinsic from "@/hooks/use-extrinsic";
import { useZKV } from "@/providers/zkv-provider";
import { Button, Link } from "@nextui-org/react";
import CodeDisplay from "./code-display";

export default function Groth16Proof() {
  const { connectedAccount } = useZKV();

  const {
    exec: submitProof,
    status,
    errorText,
    blockHash,
  } = useExtrinsic({
    pallet: "settlementGroth16Pallet",
    extrinsic: "submitProof",
    args: [MOCK_GROTH16_PROOF, GROTH16_VKEY, GROTH16_INPUT],
  });

  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Groth16 Proof</h1>

      <CodeDisplay label="Proof">
        <pre>{JSON.stringify(MOCK_GROTH16_PROOF, null, 2)}</pre>
      </CodeDisplay>

      <CodeDisplay label="vKey">
        <pre>{JSON.stringify(GROTH16_VKEY, null, 2)}</pre>
      </CodeDisplay>

      <CodeDisplay label="Inputs">
        <pre>{JSON.stringify(GROTH16_INPUT, null, 2)}</pre>
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
