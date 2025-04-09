import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";



export default async function protectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  )
}
