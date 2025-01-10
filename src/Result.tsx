import { useEffect, useState } from "react";
import Header from "./Header.tsx";
import { useVideo } from './VideoContext.tsx'; 
import LinkButton from "./children/LinkButton.tsx";

// API用URL
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo";

// APIレスポンスの型定義
interface WeatherData {
  hourly: {
    temperature_2m: number[];
    time: string[];
  };
}

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<WeatherData>();
  const [progress, setProgress] = useState(0);

  const { videoUrl } = useVideo(); // VideoContext から videoUrl を取得
  console.log(videoUrl); // videoUrlが正しく取得できているか確認

  // 各指標の点数（仮データ）
  const scores = [Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15, Math.random() * 15]; // 7つの指標点数

  // 合計点数を計算（小数点第一位まで表示）
  const totalScore = scores.reduce((acc, score) => acc + score, 0).toFixed(1);

  // プログレスバーの更新を行う
  const fetchData = async () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // 進捗情報の取得
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        setProgress(percent);
      }
    };

    // リクエストが完了した時にデータを設定
    xhr.onload = () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        setData(result);
      }
    };

    // エラー処理
    xhr.onerror = () => {
      console.error("Error fetching the data");
    };

    // 最後にローディングを終了
    xhr.onloadend = () => {
      setIsLoading(false);
    };

    // リクエスト送信
    xhr.send();
  };

  // コンポーネントがマウントされた時にデータ取得
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header title="北九州高専DCON!" />
        <main>
          <div className="loading-container">
            <h1 className="loading-text">Loading...</h1>
          </div>
        </main>
      </>
    );
  } else {
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
          {<LinkButton text="戻る" link="/" canLink={true} />}
        </main>
      </>
    );
  }
};

export default Result;
