import React, { useState } from "react";
import Header from "./Header.tsx";
import "./Running.css";

function Running() {
  const [volume, setVolume] = useState(1); // 音量の状態（1: 低、2: 中、3: 高）
  const [time, setTime] = useState(0); // 経過時間

  // 音量の画像を切り替える関数
  const getVolumeIcon = () => {
    switch (volume) {
      case 1:
        return "/volume-low.png";
      case 2:
        return "/volume-medium.png";
      case 3:
        return "/volume-high.png";
      default:
        return "/volume-low.png";
    }
  };

  // 経過時間の更新
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="running-container">
      <Header />
      <div className="running-content">
        {/* 左側のコメントと音量エリア */}
        <div className="left-area">
          <div className="comment-box">
            <p className="comment-text">コメント内容がここに表示されます</p>
          </div>
          <div className="volume-area">
            <img
              src={getVolumeIcon()}
              alt="音量アイコン"
              className="volume-icon"
            />
          </div>
          <div className="time-area">
            <span className="elapsed-time">{time}s</span>
          </div>
        </div>

        {/* 右側のカメラ映像 */}
        <div className="right-area">
          <video
            className="camera-feed"
            autoPlay
            muted
            src="/camera-feed.mp4" // 実際のカメラ映像のソースを指定
          />
        </div>
      </div>

      {/* リザルト画面に行くボタン */}
      <div className="result-button">
        <button onClick={() => alert("リザルト画面に移動")}>
          リザルト画面へ
        </button>
      </div>
    </div>
  );
}

export default Running;
