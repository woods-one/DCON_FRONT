import { useNavigate } from "react-router-dom"; // 画面遷移用のフックをインポート
import Header from "./Header.tsx";
import "./App.css";

function App() {
  const navigate = useNavigate(); // useNavigate を使用して画面遷移を実現

  const handleStartClick = () => {
    navigate("/run"); // "/start" に遷移（必要に応じて変更）
  };

  return (
    <div className="App">
      <Header />
      <main>
        <div className="score-box">
          <h2>1週間の平均</h2>
          <p className="average-score">85点</p>
          <div className="button-group">
            <button className="result-button">過去の結果を確認</button>
            <button className="detail-button">詳細を確認</button>
          </div>
        </div>
        <button className="start-button" onClick={handleStartClick}>
          START
        </button>
      </main>
    </div>
  );
}

export default App;
