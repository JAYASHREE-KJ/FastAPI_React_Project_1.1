import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainApp from "./App"; 


import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import { PublicClientApplication } from "@azure/msal-browser";
import {
  MsalProvider,
  useMsal,
  useIsAuthenticated
} from "@azure/msal-react";

import "./index.css";

const msalConfig = {
  auth: {
    clientId: "bb538301-5269-4c6c-8957-b6ba692e904a", 
    authority: "https://login.microsoftonline.com/008502d6-3f79-46f0-ab37-9354e3fe80ff", // 🔁 replace
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};


const msalInstance = new PublicClientApplication(msalConfig);



const queryClient = new QueryClient();



function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = async () => {
    try {
      await instance.loginRedirect({ scopes: ["User.Read"] });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutRedirect();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
          onClick={handleLogin}
        >
          Sign in with Microsoft
        </button>
      </div>
    );
  }

  return (
    
      

      <MainApp />
    
  );
}


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>
);
