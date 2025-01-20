import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="flex justify-between p-3 shadow-sm">
      <Image src={"/logo2.png"} width={80} height={30} alt="logo"/>
      <Button>Get Started</Button>
    </div>
  );  
}

export default Header;
