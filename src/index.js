import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import ProfilePicContext from "./context/ProfilePicContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ProfilePicContext>
          <App />
        </ProfilePicContext>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
  );
