// src/components/LoginPage.jsx
import { useState, type FormEvent } from "react";
import { useAuthContext } from "../context";

export const LoginPage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setApiKey, setIsAuthError, isAuthError } = useAuthContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setIsLoading(true);
      console.log("submitted: ", value);
      setApiKey(value.trim());
      setIsAuthError(false); // Reset error on new login attempt
      // Loading state will be cleared when MainPage loads or fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Enter API Key</h1>

        {isAuthError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Invalid API key. Try again.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste your x-api-key"
            className="w-full p-3 border rounded mb-4"
            autoFocus
          />
          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Access"}
          </button>
        </form>
      </div>
    </div>
  );
};
