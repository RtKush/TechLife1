import { RootState } from "@/lib/store"
import { useSelector } from "react-redux"

export const useAuth = () => {

    const userAuth = useSelector((state: RootState) => state.auth.user)

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return { userAuth, isAuthenticated }
}