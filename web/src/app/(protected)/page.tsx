'use client'

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      <p className="underline decoration-double">PROTECTED</p>
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        variant="destructive"
      >
        Déconnexion
      </Button>
    </div >
  );
}
