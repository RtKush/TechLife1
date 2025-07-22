import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthUser {
    id: string;
    userName?: string | null;
    name?: string | null;
    email: string;
    avatar?: string | null;
    bio?: string | null
}

export interface AuthState {
    user: AuthUser | null,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.isAuthenticated = !!action.payload
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },

    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer