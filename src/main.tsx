import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./api/mock/browser.ts");
  return await worker.start({
    serviceWorker: {
      url: "/public/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
