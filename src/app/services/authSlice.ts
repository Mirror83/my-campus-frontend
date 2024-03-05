import { createSlice } from "@reduxjs/toolkit";

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
    error: string | null;
    isLoading: boolean;
}

const initialState: authState = {
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
    error: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        setTokens: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Add extra reducers here
    }
});