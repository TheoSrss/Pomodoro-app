import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions"

import { redirect } from "next/navigation";

export const metadata = {
  title: "Pomodoro - Dashboard",
};

export default async function protectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  )
}
