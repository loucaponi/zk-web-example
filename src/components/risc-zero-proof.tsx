"use client";

import {
  BLOCK_EXPLORER_BASE_URL,
  MOCK_RISC_ZERO_PROOF,
  RISC_ZERO_PUBLIC_INPUTS,
  RISC_ZERO_VKEY,
} from "@/constants";
import useExtrinsic from "@/hooks/use-extrinsic";
import { useZKV } from "@/providers/zkv-provider";
import { Button, Link } from "@nextui-org/react";
import CodeDisplay from "./code-display";

export default function RiscZeroProof() {
  const { connectedAccount } = useZKV();

  const {
    exec: submitProof,
    status,
    errorText,
    blockHash,
  } = useExtrinsic({
    pallet: "settlementRisc0Pallet",
    extrinsic: "submitProof",
    args: [RISC_ZERO_VKEY, MOCK_RISC_ZERO_PROOF, RISC_ZERO_PUBLIC_INPUTS],
  });

  return (
    <div className="w-full">
      <h1 className="text-large font-bold mt-3 mb-4">Submit Risc Zero Proof</h1>

      <CodeDisplay label="Verification Key">{RISC_ZERO_VKEY}</CodeDisplay>

      <CodeDisplay className="h-48" label="Proof">
        {MOCK_RISC_ZERO_PROOF}
      </CodeDisplay>

      <CodeDisplay label="Public Inputs">{RISC_ZERO_PUBLIC_INPUTS}</CodeDisplay>

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
