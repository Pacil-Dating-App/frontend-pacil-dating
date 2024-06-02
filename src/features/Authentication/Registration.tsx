import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface FormData {
  user: {
    username: string;
    password: string;
    email: string;
  };
}

export default function Registration() {
  const navigate = useNavigate();
  const { addUser } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    user: {
      username: "",
      password: "",
      email: ""
    },
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    const userData = {
      email: formData.user.email,
      name: formData.user.username,
      password: formData.user.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      addUser(result);
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('An unknown error occurred');
      }
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
              Register your account
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
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={formData.user.email}
              onChange={handleChange}
              placeholder="Email"
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
            {authError && <p className="text-red-500">{authError}</p>}
            <div className="flex items-center mt-3 justify-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </figure>
  );
}
