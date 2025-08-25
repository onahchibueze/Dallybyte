import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import "./index.css";
import { FoodInfoProvider } from "./store/FoodContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="901621392043-vrmktvbjvkcg1r9nt52fv9vsuaabiv8i.apps.googleusercontent.com">
      <BrowserRouter>
        <FoodInfoProvider>
          <App />
        </FoodInfoProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
