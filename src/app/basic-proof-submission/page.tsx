"use client";

import BoojumProof from "@/components/boojum-proof";
import FflonkProof from "@/components/fflonk-proof";
import Groth16Proof from "@/components/groth16-proof";
import RiscZeroProof from "@/components/risc-zero-proof";
import { MOCK_FFLONK_PROOF } from "@/constants";
import { Tab, Tabs } from "@nextui-org/react";

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
