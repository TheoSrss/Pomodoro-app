
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    // console.log(session);
    // console.log(process.env.GOOGLE_CLIENT_ID);
    // console.log(process.env.GOOGLE_CLIENT_SECRET);
    return (
        <html lang="fr">
            <body>
                {children}
            </body>
        </html>
    );
}
