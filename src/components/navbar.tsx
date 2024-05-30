import Image from "next/image";
import Link from "next/link";
import ConnectWalletButton from "./connect-wallet-button";

export default function Navbar() {
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
        <ConnectWalletButton />
      </div>
    </div>
  );
}
