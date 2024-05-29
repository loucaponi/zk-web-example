"use client";
import { Button, Code, Input } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
const snarkjs = require("snarkjs");

export default function Home() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [creating, setCreating] = useState(false);
  const [proof, setProof] = useState("");
  const [publicSignals, setPublicSignals] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const makeProof = useCallback(async () => {
    setCreating(true);
    setIsValid(null);
    const { proof, publicSignals } = await snarkjs.fflonk.fullProve(
      { a, b },
      "circuit_js/circuit.wasm",
      "circuit.zkey"
    );
    setProof(proof);
    setPublicSignals(publicSignals);
    setCreating(false);
  }, [a, b]);

  const verifyProof = useCallback(async () => {
    setIsValid(null);
    setIsVerifying(true);
    const vKey = await fetch("/verification_key.json");
    try {
      setIsValid(
        await snarkjs.fflonk.verify(await vKey.json(), publicSignals, proof)
      );
      setIsVerifying(false);
    } catch (e: unknown) {
      setIsValid(false);
      setIsVerifying(false);
    }
  }, [publicSignals, proof]);

  return (
    <div className="max-w-[800px] mx-auto py-4">
      <h1 className="text-large font-bold">ZK Verify Demo Apps</h1>
      <div className="flex flex-col">
        <Link href="/basic-proof-submission">Basic Proof Submission</Link>
        <Link href="/">Factorization Prover (Coming Soon)</Link>
      </div>
    </div>
  );
}
