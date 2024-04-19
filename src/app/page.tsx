"use client";
import { Button, Code, Input } from "@nextui-org/react";
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
      <h1 className="text-2xl font-bold mb-2">Factorization Prover</h1>

      <form
        className="mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          makeProof();
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="First Number"
            onChange={(e) => setA(e.target.value)}
            value={a}
          />

          <Input
            type="text"
            label="Second Number"
            onChange={(e) => setB(e.target.value)}
            value={b}
          />
          <Button disabled={creating} color="primary" type="submit">
            Generate FFLONK Proof
          </Button>
        </div>
      </form>

      {proof && publicSignals && !creating && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Proof</h2>
          <div className="text-sm text-gray-600 mb-2">
            This is a proof to show that the number{" "}
            <span className="font-bold">{Number(a) * Number(b)}</span> is the
            result of multiplying two factors, without revealing what they are.
          </div>
          <div className="flex flex-col gap-4">
            <Code color="default">
              <pre>{JSON.stringify(proof, null, 2)}</pre>
            </Code>
            <h2 className="text-2xl font-bold">Public Signals</h2>

            <Code color="default">
              <pre>{JSON.stringify(publicSignals, null, 2)}</pre>
            </Code>
            {isValid && <div className="text-green-600">Proof is Valid</div>}
            {isValid === false && (
              <div className="text-red-600">Proof is Invalid</div>
            )}
            <Button
              disabled={isVerifying}
              color="primary"
              onClick={verifyProof}
            >
              Verify Proof
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
