import { useAccountContext } from "@/context/account-context";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { connectedAccount, handleConnectWallet } = useAccountContext();
  return (
    <div className="flex h-[75px] w-full items-center px-8 bg-gray-50">
      <Link href="/">
        <Image src="/logo.webp" alt="ZK Verify logo" height="300" width="125" />
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
