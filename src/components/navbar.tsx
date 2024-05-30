"use client";

import { useZKV } from "@/context/zkv-provider";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { connectedAccount, handleConnectWallet } = useZKV();
  return (
    <div className="flex h-[75px] w-full items-center px-8 bg-gray-50">
      <Link href="/">
        <div>
          <Image
            src="/logo.webp"
            alt="ZK Verify logo"
            height={25}
            width={125}
          />
        </div>
        <div className="text-xs font-bold text-right">Demo Series</div>
      </Link>

      <div className="ml-auto">
        {!connectedAccount && (
          <Button onClick={handleConnectWallet} className="bg-emerald-400">
            Connect Wallet
          </Button>
        )}
        {connectedAccount && (
          <Button variant="bordered">
            {getAbbreviatedHash(connectedAccount.address)}
          </Button>
        )}
      </div>
    </div>
  );
}

function getAbbreviatedHash(hash: string) {
  return `${hash.substring(0, 4)}...${hash.substring(
    hash.length - 4,
    hash.length
  )}`;
}
