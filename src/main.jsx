import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThirdwebProvider } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider activeChain={"binance-testnet"} clientId="5af04edc671f993f1b9cd5f24f7326c6">
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <Toaster toastOptions={{ className: "bg-blue-500 p-6 text-white" }} />
      </React.StrictMode>
    </BrowserRouter>
  </ThirdwebProvider>
);
