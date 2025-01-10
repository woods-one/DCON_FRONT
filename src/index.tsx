import React from "react";
import ReactDOM from "react-dom/client"; // 更新されたインポート
import "./index.css";
import App from "./App.tsx";
import Test from "./Result.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoProvider } from "./VideoContext.tsx"; // VideoProviderをインポート
import reportWebVitals from "./reportWebVitals.ts";

// React 18に対応したコード
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement); // TypeScript対応
root.render(
  <React.StrictMode>
    <VideoProvider> {/* VideoProviderで全体をラップ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/result" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </VideoProvider>
  </React.StrictMode>
);

reportWebVitals();
