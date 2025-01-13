import { useState } from "react";
import Header from "./Header.tsx";
import { useVideo } from './VideoContext.tsx'; 
import LinkButton from "./children/LinkButton.tsx";

const Result = () => {
  const { videoUrl } = useVideo(); // VideoContext から videoUrl を取得

  // 各指標の点数（仮データ）
  const scores = [Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15]; // 7つの指標点数

  // 合計点数を計算（小数点第一位まで表示）
  const totalScore = scores.reduce((acc, score) => acc + score, 0).toFixed(1);

  return (
    <>
      <Header title="北九州高専DCON!" />
      <main>
        <h1>リザルト</h1>
        {videoUrl ? (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            お使いのブラウザは動画をサポートしていません。
          </video>
        ) : (
          <p>動画が選ばれていません。</p>
        )}

        <div className="score-container">
          <div className="score-list">
            <h3>各指標の点数</h3>
            {["首の動き", "体の動き", "声の大きさ", "声の速度", "文字密度", "レーザーポインターの動き", "プレゼンと発言内容の一致"].map((label, index) => (
              <p key={index}>
                {label}: {scores[index].toFixed(1)} / 15
              </p>
            ))}
          </div>
          <div className="total-score">
            <h2>合計点: {totalScore} 点</h2>
          </div>
        </div>
        <LinkButton text="戻る" link="/" canLink={true} />
      </main>
    </>
  );
};

export default Result;
