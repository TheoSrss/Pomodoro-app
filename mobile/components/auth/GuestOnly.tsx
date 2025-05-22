import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import Loader from '../Loader'

const GuestOnly = ({ children }: { children: React.ReactNode }) => {
    const { user, authCheck } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authCheck && user !== null) {
            router.replace("/dashboard")
        }
    }, [user, authCheck])

    if (!authCheck || user) {
        return <Loader />;

    }
    return children
}

export default GuestOnly