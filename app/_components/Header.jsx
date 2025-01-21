import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between p-3 shadow-sm">
      <Link href={"/"}>
        <Image src={"/logo2.png"} width={80} height={30} alt="logo" />
      </Link>
    </div>
  );
}

export default Header;
