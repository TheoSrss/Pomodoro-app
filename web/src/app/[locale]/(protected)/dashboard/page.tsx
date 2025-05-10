'use client'

import { NavBar } from "@/components/navbar/navbar";
import { Pomodoro } from "@/components/pomodoro/pomodoro";

export default function Home() {
  return (
    <div className="mx-5 xl:w-6xl xl:mx-auto mt-5 flex flex-col items-center">
      <NavBar />
      <Pomodoro />
    </div>
  );
}
