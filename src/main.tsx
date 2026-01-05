import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL: ", BASE_URL);

async function enableMocking() {
  const { worker } = await import("./api/mock/browser.ts");
  return await worker.start({
    // serviceWorker: {
    //   url: BASE_URL
    //     ? `/${BASE_URL}/mockServiceWorker.js`
    //     : `/mockServiceWorker.js`,
    // },
        serviceWorker: {
      url: `/mockServiceWorker.js`,
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
