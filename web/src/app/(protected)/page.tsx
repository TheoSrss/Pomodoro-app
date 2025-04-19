'use client'

import { NavBar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Pomodoro } from "@/components/pomodoro/pomodoro";

export default function Home() {
  return (
    <div className="bg-red-000 py-10 px-100 flex flex-col items-center">
      <NavBar />
      <Pomodoro />
    </div>
  );
}
