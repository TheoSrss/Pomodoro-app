'use client'

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      <p className="underline decoration-double text-red-800">PROTECTED</p>
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Déconnexion
      </Button>
    </div >
  );
}
