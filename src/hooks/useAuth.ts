// import { useState } from "react";
// import { getApiKey, clearApiKey, setApiKey } from "../api/client";

// export const useAuth = () => {
//   const [apiKey, setApiKeyState] = useState(() => getApiKey() || "");

//   const isAuthenticated = !!apiKey;

//   const login = (key: string) => {
//     setApiKeyState(key);
//     setApiKey(key);
//   };

//   const logout = () => {
//     setApiKeyState("");
//     clearApiKey();
//   };

//   return {
//     apiKey,
//     isAuthenticated,
//     login,
//     logout,
//   };
// };
