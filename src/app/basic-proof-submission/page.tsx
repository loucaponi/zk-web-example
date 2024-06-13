"use client";

import { MOCK_FFLONK_PROOF } from "@/constants";
import { Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
const FflonkProof = dynamic(() => import("@/components/fflonk-proof"), {
  ssr: false,
});
const BoojumProof = dynamic(() => import("@/components/boojum-proof"), {
  ssr: false,
});
const RiscZeroProof = dynamic(() => import("@/components/risc-zero-proof"), {
  ssr: false,
});
const Groth16Proof = dynamic(() => import("@/components/groth16-proof"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-[800px] mx-auto py-8">
      <Tabs size="lg" aria-label="Tabs for Proof Types">
        <Tab key="groth16" title="Groth16">
          <Groth16Proof />
        </Tab>
        <Tab key="risc" title="Risc Zero">
          <RiscZeroProof />
        </Tab>
        <Tab key="fflonk-cdk" title="Fflonk (Polygon CDK)">
          <FflonkProof mockProof={MOCK_FFLONK_PROOF} />
        </Tab>

        {/* TODO
        <Tab key="fflonk-vkey" title="Fflonk (Custom vKey)">
          <FflonkProof
            mockProof={MOCK_FFLONK_PROOF}
            vKey="hello"
          />
        </Tab> */}

        <Tab key="boojum" title="Boojum">
          <BoojumProof />
        </Tab>
      </Tabs>
    </div>
  );
}
