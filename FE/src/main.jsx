import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ErrorBoundary } from "react-error-boundary";

const root = document.getElementById("root");

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <h2>Thử lại:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Thử lại</button>
  </div>
);

ReactDOM.createRoot(root).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
);

