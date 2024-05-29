"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto py-4">
      <h1 className="text-large font-bold">ZK Verify Demo Apps</h1>
      <div className="flex flex-col">
        <Link href="/basic-proof-submission">Basic Proof Submission</Link>
        <Link href="/factorization-prover">
          Factorization Prover (Coming Soon)
        </Link>
      </div>
    </div>
  );
}
