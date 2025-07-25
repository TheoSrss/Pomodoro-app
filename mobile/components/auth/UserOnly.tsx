import { useRouter } from "expo-router";
import { useEffect } from "react";
import Loader from "../Loader";
import { useUser } from "../../hooks/useUser";

const UserOnly = ({ children }: { children: React.ReactNode }) => {
    const { user, authCheck } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authCheck && user === null) {
            router.replace('/login');
        }
    }, [user, authCheck]);

    if (!authCheck || user === null) {
        return <Loader />;
    }

    return children;
}

export default UserOnly;