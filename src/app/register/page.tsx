"use client";

import { register } from "@/auth/actions";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[400px]">
      <input
        type="text"
        placeholder="username"
        className="border p-2"
        name="username"
        required
      />
      <input
        type="password"
        placeholder="password"
        className="border p-2"
        name="password"
        required
      />
      <input
        type="password"
        placeholder="confirm password"
        className="border p-2"
        name="confirmPassword"
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button className="bg-black text-white p-2">Register</button>
      <Link className="underline" href="/login">
        Already have an account?
      </Link>
    </form>
  );
};

export default RegisterPage;
