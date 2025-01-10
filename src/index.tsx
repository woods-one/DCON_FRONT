import React from "react";
import ReactDOM from "react-dom/client"; // 更新されたインポート
import "./index.css";
import App from "./App.tsx";
import Test from "./Test.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.ts";

// React 18に対応したコード
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement); // TypeScript対応
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// パフォーマンス測定を開始したい場合、関数を渡してログを取得できます
// 例えば: reportWebVitals(console.log)
// または、分析エンドポイントに送信できます。詳細は https://bit.ly/CRA-vitals をご覧ください
reportWebVitals();
