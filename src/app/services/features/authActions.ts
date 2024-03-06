import { createAsyncThunk } from "@reduxjs/toolkit";



const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;


interface UserCreate {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    re_password: string;
}

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (user: UserCreate, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}api/v2/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

interface UserLogin {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (user: UserLogin, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}api/v1/auth/jwt/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async (token: string, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}api/v1/auth/jwt/verify/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (refresh: string, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}api/v1/auth/jwt/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh })
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (token: string, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}api/v2/users/me/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
