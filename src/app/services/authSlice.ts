import { createSlice } from "@reduxjs/toolkit";
import { signUp, getUser, signIn, refreshToken, verifyToken } from "./features/authActions";

type user = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    topics: string[];
};

type authState = {
    user: user | null;
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
    isVerified: boolean;
    error: string | undefined | null;
    isLoading: boolean;
}

const initialState: authState = {
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
    isVerified: false,
    error: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.isVerified = false;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                state.isAuthenticated = true;
                localStorage.setItem("access", action.payload.access);
                localStorage.setItem("refresh", action.payload.refresh);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(refreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.access = action.payload.access;
                localStorage.setItem("access", action.payload.access);
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(verifyToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyToken.fulfilled, (state) => {
                state.isLoading = false;
                state.isVerified = true;
                state.isAuthenticated = true;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isVerified = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            })
    }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
