import { useEffect, useState } from "react";
import Header from "./Header.tsx";

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
          <h2>Temperature Forecast</h2>
          {data && data.hourly && (
            <ul>
            </ul>
          )}
        </main>
      </>
    );
  }
};

export default Result;
