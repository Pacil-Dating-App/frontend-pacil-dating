import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface FormData {
  user: {
    username: string;
    password: string;
  };
}

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState<FormData>({
        user: {
        username: "",
        password: "",
        },
    });

    const [authError, setAuthError] = useState(false);

    // Dummy credentials for authentication
    const DUMMY_USER = {
        username: "testuser",
        password: "password123",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
        user: {
            ...formData.user,
            [e.target.name]: e.target.value,
        },
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.user.username === DUMMY_USER.username && formData.user.password === DUMMY_USER.password) {
        login();
        navigate('/');
        setAuthError(false);
        } else {
        setAuthError(true);
        }
    };

    return (
        <figure className="h-screen flex bg-white">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
            <blockquote className="text-2xl font-medium text-center">
            <p className="text-lg font-semibold">Welcome to Pacil Dating App</p>
            </blockquote>

            <div className="text-primary m-6">
            <div className="flex items-center mt-3 justify-center">
                <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                Login to your account
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label className="text-left">Username:</label>
                <input
                name="username"
                type="text"
                value={formData.user.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                />
                <label>Password:</label>
                <input
                name="password"
                type="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                />
                {authError && <p className="text-red-500">Invalid username or password</p>}
                <div className="flex items-center mt-3 justify-center">
                <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                >
                    Login
                </button>
                </div>
            </form>
            <div className="flex items-center mt-3 justify-center">
                <button className="justify-center text-blue-500 hover:underline">
                Need to register? Sign up for free
                </button>
            </div>
            </div>
        </div>
        </figure>
    );
}

