import React, { useState, useEffect, useRef } from "react";
import Header from "./Header.tsx";
import "./Running.css";
import { useNavigate } from "react-router-dom"; // 画面遷移用のフックをインポート

function Running() {
  const [volume, setVolume] = useState(1); // 音量の状態（1: 低、2: 中、3: 高）
  const [time, setTime] = useState(0); // 経過時間
  const [comment, setComment] = useState(""); // コメント内容
  const videoRef = useRef<HTMLVideoElement | null>(null); // video要素への参照

  // コメントの候補リスト
  const comments = [
    "今日は素晴らしいプレゼンですね！",
    "もっと声を大きくすると良いかもしれません。",
    "素晴らしい内容ですが、少しスピードを調整してみましょう。",
    "目線を聴衆に向けると、もっと良くなります。",
    "次のセクションに進む準備ができましたか？",
    "話の流れがとてもスムーズですね。",
    "ちょっと休憩を入れてみると良いかもしれません。",
    "内容が豊富で、聞き応えがあります。",
    "もっと表情を使って、話を引き込むと良いですね。",
    "ポジティブなエネルギーが伝わります！"
  ];

  // 音量の画像を切り替える関数
  const getVolumeIcon = () => {
    switch (volume) {
      case 1:
        return "/volumes/volume-low.png";
      case 2:
        return "/volumes/volume-medium.png";
      case 3:
        return "/volumes/volume-high.png";
      default:
        return "/volumes/volume-low.png";
    }
  };

  // 音量アイコンをランダムに選ぶ関数
  const getRandomVolumeIcon = () => {
    const randomValue = Math.random();
    if (randomValue < 0.7) {
      // 70%の確率でmediumアイコン
      return 2;
    } else if (randomValue < 0.9) {
      // 20%の確率でhighアイコン
      return 3;
    } else {
      // 10%の確率でlowアイコン
      return 1;
    }
  };

  // コメント内容をランダムに更新
  const getRandomComment = () => {
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
  };

  // コメント内容の更新を定期的に実施
  useEffect(() => {
    const commentInterval = setInterval(() => {
      setComment(getRandomComment()); // ランダムにコメントを更新
    }, 4000); // 4秒ごとにコメント内容を更新

    return () => clearInterval(commentInterval); // クリーンアップ
  }, []);

  // 音量アイコンの更新を定期的に実施
  useEffect(() => {
    const volumeInterval = setInterval(() => {
      setVolume(getRandomVolumeIcon()); // ランダムに音量を更新
    }, 2000); // 2秒ごとに音量アイコンを更新

    return () => clearInterval(volumeInterval); // クリーンアップ
  }, []);

  // 経過時間の更新
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate(); // useNavigate を使用して画面遷移を実現

  const handleStartClick = () => {
    navigate("/result"); // "/result" に遷移（必要に応じて変更）
  };

  // カメラ映像の取得
  useEffect(() => {
    // getUserMediaを使用してカメラ映像を取得
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("カメラへのアクセスに失敗しました: ", err);
      });

    return () => {
      // コンポーネントのアンマウント時にストリームを停止
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // 経過時間を分と秒に分割
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // 経過時間表示の形式を「分:秒」にする
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="running-container">
      <Header />
      <div className="running-content">
        <div className="left-area">
          <div className="comment-box">
            <div className="comment-heading">コメント</div> {/* コメントの見出し */}
            <p className="comment-text">{comment}</p> {/* ランダムに変更されるコメント内容 */}
            <div className="center-line"></div>
            <div className="volume-area">
              <img
                src={getVolumeIcon()}
                alt="音量アイコン"
                className="volume-icon"
              />
            </div>
          </div>

          <div className="time-area">
            <h3>経過時間</h3> {/* 経過時間の見出し */}
            <p>{formattedTime}</p> {/* 経過時間の表示 */}
          </div>
        </div>

        <div className="right-area">
          <video
            ref={videoRef}
            className="camera-feed"
            autoPlay
            muted
          />
        </div>
      </div>
      <div className="result-button">
        <button onClick={handleStartClick}>
          FINISH
        </button>
      </div>
    </div>
  );
}

export default Running;
